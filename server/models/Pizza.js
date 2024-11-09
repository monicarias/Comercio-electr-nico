const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
  idProd: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: "String",
    required: true,
  },
  prices: [
    {
      id: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      priceDescription: {
        type: String,
        required: true,
      },
    },
  ],
  img: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// 3. MODELO
const Pizza = mongoose.model("Pizza", pizzaSchema);

// 4. EXPORTACIÓN
module.exports = Pizza;
