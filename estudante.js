const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose 
   .connect("mongodb://localhost:27017/livraria")
   .then(() => console.log("Conectado ao MongoDB"))
   .catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});

async function criarEstudante(nome,matricula,curso,ano) {
    try{
        const novoEstudante = new Estudante ({ nome, matricula, curso, ano})
        return await novoEstudante.save();
    } catch (erro) {
        console.error("Erro ao adicionar estudante:", erro);
        throw erro;
    }
}

app.post("/estudantes", async (req, res) => {
    try {
        const { nome, matricula, curso, ano} = req.body;
        const novoEstudante = await criarEstudante(nome, matricula, curso, ano);
        res
           .status(201)
           .json({ mensagem: "Estudante adicionado com sucesso", estudante: novoEstudante})
    } catch (erro) {
        res
           .status(500)
           .json({ mensagem: "Erro ao adicionar estudante", erro:erro.message});
    }
});

async function obterEstudantes () {
    try {
        return await Estudante.find();
    } catch (erro) {
        console.error("erro ao obter estudantes:", erro);
        throw erro;
    }
}

app.get("/estudantes", async (req, res) => {
    try {
        const estudantes = await obterEstudantes();
        res.status(200).json(estudantes);
    }   catch (erro) {
        res
          .status(500)
          .json({ mensagem: "Erro ao obter estudantes", erro: erro.message});
    }
});

async function atualizarEstudante (id, nome, matricula, curso, ano){
    try{
        const estudanteAtualizado = await Estudante.findByIdAndUpdate(
            id,
            { nome, matricula, curso, ano},
            { new: true, runValidators: true}
        );
        return estudanteAtualizado;
    }catch (erro) {
        console.error("Erro ao atualizar estudante:", erro);
        throw erro;
    }
}

app.put("/estudantes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const { nome, matricula, curso, ano} = req.body;
        const estudanteAtualizado = await atualizarEstudante(
            id,
            nome,
            matricula,
            curso,
            ano
        );
        if (estudanteAtualizado) {
            res
            .status(200)
            .json({
                mensagem: "Estudante atualizado com sucesso",
                estudante: estudanteAtualizado,
            });
        } else {
            res.status(404).json({ mensagem: "Estudante não encontrado"});
        }
    }catch (erro) {
        res
        .status(500)
        .json({ mensagem: "Erro ao atualizar estudante", erro: erro.message});
    }
});

async function deletarEstudante(id) {
    try {
        const estudanteDeletado = await Estudante.findByIdAndDelete(id);
        return estudanteDeletado;
    } catch (erro) {
        console.error("Erro ao deletar estudante:", erro);
        throw erro;
    }
}

app.delete("/estudantes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const estudanteDeletado = await deletarEstudante(id);
        if (estudanteDeletado){
            res
            .status(200)
            .json({ mensagem: "Estudante atualizado com sucesso", estudante: estudanteDeletado});
        }else {
            res.status(404).json({ mensagem: "Estudante não encontrado"});
        }
    }catch (erro) {
        res
        .status(500)
        .json({ mensagem: "Erro ao deletar estudante", erro: erro.message});
    }
});