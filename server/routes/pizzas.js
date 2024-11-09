const express = require("express");
const router = express.Router();

const pizzaController = require("../controllers/pizzaController");

/**
 * @swagger
 * components:
 *  schemas:
 *    Pizza:
 *      type: object
 *      properties:
 *        idProd:
 *          type: string
 *        name:
 *          type: string
 *        currency:
 *          type: string
 *        prices:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              size:
 *                type: string
 *              price:
 *                type: number
 *              description:
 *                type: string
 *        img:
 *          type: array
 *          items:
 *            type: string
 *        description:
 *          type: string
 *        slug:
 *          type: string
 *      example:
 *        name: "Pizza de Jamón"
 *        currency: "USD"
 *        prices: [
 *          {
 *            "size": "Familiar",
 *            "price": 18900,
 *            "description": "incluye 12 rebanadas."
 *          },
 *          {
 *            "size": "Individual",
 *            "price": 9900,
 *            "description": "incluye 6 rebanadas."
 *          }
 *        ]
 *        img: ["https://images.unsplash.com/photo-1661289898757-2849b9999de4"]
 *        description: "Deliciosa pizza de jamón"
 *        slug: "pizza-jamon"
 */

/**
 * @swagger
 * /api/pizzas/create:
 *   post:
 *     summary: Crea una nueva pizza
 *     tags: [Pizzas]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pizza'
 *     responses:
 *       200:
 *         description: La pizza se creó con éxito
 *       400:
 *         description: Error al crear la pizza
 */

router.post("/create", pizzaController.create);

/**
 * @swagger
 * /api/pizzas/readall:
 *   get:
 *     summary: Obtiene todas las pizzas
 *     tags: [Pizzas]
 *     responses:
 *       200:
 *         description: Lista de todas las pizzas
 *       400:
 *         description: Error al obtener las pizzas
 */

router.get("/readall", pizzaController.readAll);

/**
 * @swagger
 * /api/pizzas/readone/{slug}:
 *   get:
 *     summary: Obtiene una pizza por slug
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug de la pizza
 *     responses:
 *       200:
 *         description: Datos de la pizza
 *       400:
 *         description: Error al obtener la pizza
 */

router.get("/readone/:slug", pizzaController.readOne);

module.exports = router;
