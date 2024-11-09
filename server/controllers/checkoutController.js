// Importa los modelos de Cart y User
const Cart = require("../models/Cart");
const User = require("../models/User");

// Importa stripe y configura con la clave de stripe en las variables de entorno
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Función para crear una sesión de checkout en Stripe
exports.createCheckoutSession = async (req, res) => {
  // Obtiene el ID del usuario de la solicitud
  const userID = req.user.id;

  // Encuentra al usuario en la base de datos por su ID
  const foundUser = await User.findOne({ _id: userID });

  // Encuentra el carrito del usuario en la base de datos y llena los productos
  const foundCart = await Cart.findById(foundUser.cart).populate({
    path: "products",
  });

  // Crea line_items para la sesión de Stripe a partir de los productos en el carrito
  const line_items = foundCart.products.map((e) => {
    return {
      price: e.priceID,
      quantity: e.quantity,
    };
  });

  // Crea una sesión de checkout en Stripe
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.REACT_BASE_URL}`,
    cancel_url: `${process.env.REACT_BASE_URL}`,
    customer_email: foundUser.email,
  });

  // Envia la URL de la sesión y la sesión como respuesta
  res.json({
    session_url: session.url,
    session: session,
  });
};

// Función para crear una orden
exports.createOrder = async (req, res) => {
  // Obtiene la firma de Stripe de los headers
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET;

  let event;

  try {
    // Construye el evento de Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    // Si hay un error, registra el error y envía una respuesta de error
    console.log(err);
    res.status(400).send(`Hubo un problema relacionado con el evento.`);
    return;
  }

  // Dependiendo del tipo de evento
  switch (event.type) {
    case "charge.succeeded":
      // Si la carga fue exitosa
      const paymentIntent = event.data.object;

      const email = paymentIntent.billing_details.email;

      const receiptURL = paymentIntent.receipt_url;

      const receiptID = receiptURL
        .split("/")
        .filter((item) => item)
        .pop();

      const amount = paymentIntent.amount;

      const date_created = paymentIntent.created;

      // Actualiza el usuario con los datos del recibo
      await User.findOneAndUpdate(
        { email },
        {
          $push: {
            receipts: {
              receiptURL,
              receiptID,
              date_created,
              amount,
            },
          },
        },
        { new: true }
      );

      break;
    default:
      // Si el tipo de evento no se maneja, registra el tipo de evento
      console.log(`Unhandled event type ${event.type}`);
  }

  // Envía una respuesta vacía
  res.send();
};

// Función para crear un carrito
exports.createCart = async (req, res) => {
  // Crea un carrito con los datos de la solicitud
  const newCart = await Cart.create(req.body);

  // Envía el nuevo carrito en la respuesta
  res.json({
    cart: newCart,
  });
};

// Función para obtener un carrito
exports.getCart = async (req, res) => {
  // Obtiene el ID del usuario de la solicitud
  const userID = req.user.id;

  // Encuentra al usuario en la base de datos por su ID
  const foundUser = await User.findOne({ _id: userID });

  // Encuentra el carrito del usuario en la base de datos
  const foundCart = await Cart.findOne({ _id: foundUser.cart });

  // Envía el carrito encontrado en la respuesta
  res.json({
    cart: foundCart,
  });
};

// Función para editar un carrito
exports.editCart = async (req, res) => {
  // Obtiene el ID del usuario de la solicitud
  const userID = req.user.id;

  // Encuentra al usuario en la base de datos por su ID
  const foundUser = await User.findOne({ _id: userID });

  // Toma los nuevos datos de los productos de la solicitud
  const { products } = req.body;

  // Actualiza el carrito con los nuevos datos de los productos
  const updatedCart = await Cart.findByIdAndUpdate(
    foundUser.cart,
    {
      products,
    },
    { new: true }
  );

  // Envía un mensaje y el carrito actualizado en la respuesta
  res.json({
    msg: "Tu carrito fue actualizado",
    updatedCart,
  });
};
