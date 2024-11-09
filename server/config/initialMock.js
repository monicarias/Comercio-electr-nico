const mongoose = require("mongoose");
require("dotenv").config({ path: "./../.env" });

const Pizza = require("../models/Pizza");
const stripe = require("stripe")(process.env.STRIPE_WH_SIGNING_SECRET);

const pizzas = [
  {
    name: "Pizza de Jamón",
    prices: [
      {
        size: "Familiar",
        price: 18900,
        description: "incluye 12 rebanadas.",
      },
      {
        size: "Individual",
        price: 9900,
        description: "incluye 6 rebanadas.",
      },
    ],
    img: [
      "https://res.cloudinary.com/dly0dc6ka/image/upload/v1641847992/mn-pizza-app/pizza-jamon.jpg",
    ],
    currency: "mxn",
    description: "Incluye una pizza de jamón con queso mozzarella.",
    slug: "jamon",
  },
  {
    name: "Pizza de 4 quesos",
    prices: [
      {
        size: "Familiar",
        price: 15900,
        description: "incluye 12 rebanadas.",
      },
      {
        size: "Individual",
        price: 7900,
        description: "incluye 6 rebanadas.",
      },
    ],
    img: [
      "https://res.cloudinary.com/dly0dc6ka/image/upload/v1641847992/mn-pizza-app/pizza-jamon.jpg",
    ],
    currency: "mxn",
    description: "Incluye una mezcla de diferentes quesos y en la orilla.",
    slug: "4-quesos",
  },
];

const generatePizzas = async (pizzas) => {
  pizzas.map((e) => {
    const insertPizza = async ({
      name,
      currency,
      prices,
      img,
      description,
      slug,
    }) => {
      // STRIPE
      // A. PRODUCTO
      // CREAR EL PRODUCTO EN STRIPE
      try {
        const product = await stripe.products.create({
          name,
          description,
          images: [...img],
          metadata: {
            productDescription: description,
            slug,
          },
        });

        // B. PRECIO
        // CREAR LOS PRECIOS PARA EL PRODUCTO EN STRIPE
        const stripePrices = await Promise.all(
          prices.map(async (e) => {
            return await stripe.prices.create({
              unit_amount: e.price,
              currency: currency,
              product: product.id,
              nickname: e.size,
              metadata: {
                size: e.size,
                priceDescription: e.description,
              },
            });
          })
        );

        // 2. MODIFICACIÓN EN BASE DE DATOS
        const pizzaPrices = stripePrices.map((e) => {
          return {
            id: e.id,
            size: e.metadata.size,
            priceDescription: e.metadata.priceDescription,
            price: e.unit_amount,
          };
        });

        await Pizza.create({
          idProd: product.id,
          name: product.name,
          prices: [...pizzaPrices],
          img,
          currency,
          description: product.description,
          slug,
        });

        return true;
      } catch (error) {
        console.log(error);
      }
    };

    insertPizza(e);
    return;
  });
};

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.db.dropDatabase();
    await generatePizzas(pizzas);
    console.log("Pizzas creadas correctamente");

    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();
