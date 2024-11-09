const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");

const checkoutController = require("../controllers/checkoutController");

/**
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *      type: object
 *      properties:
 *        products:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              quantity:
 *                type: number
 *              priceID:
 *                type: string
 *              name:
 *                type: string
 *              size:
 *                type: string
 *              priceDescription:
 *                type: string
 *              price:
 *                type: number
 *              img:
 *                type: string
 *              slug:
 *                type: string
 *      example:
 *        products:
 *          - quantity: 0
 *            priceID: ""
 *            size: ""
 *            priceDescription: ""
 *            price: 0.00
 */

/**
 * @swagger
 * /api/checkout/create-checkout-session:
 *   get:
 *     summary: Crear sesión de pago con Stripe
 *     tags: [Checkout]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Sesión de pago creada
 */

router.get(
  "/create-checkout-session",
  authorization,
  checkoutController.createCheckoutSession
);

/**
 * @swagger
 * /api/checkout/create-order:
 *   post:
 *     summary: Crear orden
 *     tags: [Checkout]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Orden creada
 */

router.post(
  "/create-order",
  express.raw({ type: "application/json" }),
  checkoutController.createOrder
);

/**
 * @swagger
 * /api/checkout/create-cart:
 *   post:
 *     summary: Crear carrito de compras
 *     tags: [Checkout]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Carrito creado
 */

router.post("/create-cart", checkoutController.createCart);

/**
 * @swagger
 * /api/checkout/get-cart:
 *   get:
 *     summary: Obtener carrito de compras
 *     tags: [Checkout]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Carrito de compras
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

router.get("/get-cart", authorization, checkoutController.getCart);

/**
 * @swagger
 * /api/checkout/edit-cart:
 *   put:
 *     summary: Editar carrito de compras
 *     tags: [Checkout]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *
 *       200:
 *         description: Carrito de compras actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado
 */
router.put("/edit-cart", authorization, checkoutController.editCart);

module.exports = router;
