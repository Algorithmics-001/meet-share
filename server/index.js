require('dotenv').config();
const {getDatabasePool} = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.EXPRESS_PORT;
app.use(bodyParser.json());
let meetings = [];

// Swagger options
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Meet share extension API documentation.",
      version: "0.1.0",
      description: "API documentation for the meet-share project."
    },
    servers: [
      {
        url: process.env.ENDPOINT_URL,
      },
    ],
  },
  apis: ["./index.js"],
};

// Initialize Swagger specs
const specs = swaggerJsdoc(options);

// Serve Swagger UI
app.use(
  "/meet/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// GET all meetings
/**
 * @swagger
 * tags:
 *  name: Meet
 *  description: Endpoints related to managing meetings.
 * /meet:
 *   get:
 *     summary: Get all meetings
 *     tags: [Meet]
 *     responses:
 *       '200':
 *         description: A list of meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 */
app.get('/meet', async (req, res) => {
  try {
    const db = await getDatabasePool();
    const query = 'SELECT * FROM meeting';
    const result = await db.query(query);
    res.status(200).send(result.rows);
  } catch (e) {
    res.status(500).send({error: e});
  }
});

// POST a new meeting
/**
 * @swagger
 * /meet:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       '200':
 *         description: A new meeting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 */
app.post('/meet', async (req, res) => {
  try {
    const db = await getDatabasePool();
    const { name, time, url } = req.body;
    const query = 'INSERT INTO meeting(name, time, url) VALUES($1, $2, $3) RETURNING id;';
    const options = [name, time, url];
    const {rows} = await db.query(query, options);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).send({"error": e});
  }
});

// UPDATE a meeting
/**
 * @swagger
 * /meet/{id}:
 *   put:
 *     summary: Update a meeting
 *     tags: [Meet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meeting to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       '200':
 *         description: Meeting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       '404':
 *         description: Meeting not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put('/meet/:id', async (req, res) => {
  const id = req.params.id;
  const { name, time, url } = req.body;
  try {
    const db = await getDatabasePool();
    const query = 'UPDATE meeting SET name=$1, time=$2, url=$3 WHERE id=$4;';
    const params = [name, time, url, id];
    const {rows} = await db.query(query, params);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).send({error: e});
  }
});

// DELETE a meeting
/**
 * @swagger
 * /meet/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     tags: [Meet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meeting to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Meeting deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       '404':
 *         description: Meeting not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/meet/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const db = await getDatabasePool();
    const query = 'DELETE FROM meeting WHERE id=$1';
    const options = [id];
    const {rows} = await db.query(query, options);
    res.status(200).send("success");
  } catch (e) {
    res.status(500).send({error: e});
  }
});

// Define Swagger components
/**
 * @swagger
 * components:
 *   schemas:
 *     Meeting:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         time:
 *           type: string
 *           format: date-time
 *         url:
 *           type: string
 *       required:
 *         - name
 *         - time
 *         - url
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
