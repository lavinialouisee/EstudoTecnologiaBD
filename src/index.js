const express = require("express");
const mongoose = require('mongoose');
const swaggerDocs = require('./swagger');

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerDocs.swaggerUi, swaggerDocs.swaggerUiSetup);

const port = 3000;
mongoose.connect('mongodb+srv://lavinialouise:fgM5PlnhIDTb2prO@trabalhobd.kpylk.mongodb.net/?retryWrites=true&w=majority&appName=TrabalhoBD');

const Usuario = mongoose.model('Usuario', {
    cpf: Number,
    nome: String,
    data_nascimento: Date,
 });

/**
 * @swagger
 * /:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: integer
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 */
app.post("/", async (req, res) => {
    const usuario = new Usuario({
        cpf: req.body.cpf,
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento
    });

    await usuario.save();
    res.send(usuario);
});


/**
 * @swagger
 * /{cpf}:
 *   get:
 *     summary: Localiza um usuário pelo CPF
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         description: CPF do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
app.get("/:cpf", async (req, res) => {
    const usuario = await Usuario.findOne({cpf: req.params.cpf});
    if (usuario) {
        return res.status(200).send(usuario);
      } else {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://lavinialouise:fgM5PlnhIDTb2prO@trabalhobd.kpylk.mongodb.net/?retryWrites=true&w=majority&appName=TrabalhoBD');
   console.log('Rodando...') 
});

//LINK PARA ACESSAR A DOCUMENTAÇÃO
//http://localhost:3000/api-docs