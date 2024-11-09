const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

require("dotenv").config();
const port = process.env.PORT || 3005;
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`;

const connectDB = require("./config/db");

connectDB();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pizza Restaurant API",
      version: "1.0.0",
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-auth-token",
        },
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(cors());

app.use((req, res, next) => {
  if (req.originalUrl === "/api/checkout/create-order") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use("/api/checkout", require("./routes/checkout"));
app.use("/api/pizzas", require("./routes/pizzas"));
app.use("/api/users", require("./routes/users"));
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
