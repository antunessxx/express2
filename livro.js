const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/livraria").then(() => console.log("Conectado ao MongoDB")).catch((erro) => console.error("Erro ao conectar ao mongoDB:", erro));
const port = 3000;
app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`);
});

async function criarLivro(titulo, autor, ano, genero) {
       try {
       const novoLivro = new Livro({ titulo, autor, ano, genero });
       return await novoLivro.save();
       } catch (erro) {
       console.error("Erro na criação do livro:", erro);
       throw erro;
       }
       }

app.post("/livros", async (req, res) => {
        try {
        const { titulo, autor, ano, genero } = req.body;
        const novoLivro = await criarLivro(titulo, autor, ano, genero);
        res.status(201).json({ mensagem: "Livro criado com sucesso !", livro: novoLivro });
        } catch (erro) {
        res.status(500).json({ mensagem: "Erro na criação do livro", erro: erro.message });
        }
        });    

async function obterLivros() {
        try {
        return await Livro.find();
        } catch (erro) {
        console.error("Não foi possível obter os livros:", erro);
        throw erro;
        }
        }
            
app.get("/livros", async (req, res) => {
        try {
        const livros = await obterLivros();
        res.status(200).json(livros);
        } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao obter livros", erro: erro.message });
        }
        });
        
        async function atualizarLivro(id, titulo, autor, ano, genero)
        {
        try {
        const livroAtualizado = await Livro.findByIdAndUpdate(
        id,
        { titulo, autor, ano, genero },
        { new: true, runValidators: true }
        );
        return livroAtualizado;
        } catch (erro) {
        console.error("Erro na atualização do livro:", erro);
        throw erro;
        }
        }
        
app.put("/livros/:id", async (req, res) => {
        try {
        const { id } = req.params;
        const { titulo, autor, ano, genero } = req.body;
        const livroAtualizado = await atualizarLivro(
        id,
        titulo,
        autor,
        ano,
        genero
        );
        if (livroAtualizado) {
        res.status(200).json({
        mensagem: "Livro atualizado com sucesso !",
        livro: livroAtualizado,
        });
        } else {
        res.status(404).json({ mensagem: "O livro não foi encontrado..." });
        }
        } catch (erro) {
        res.status(500).json({ mensagem: "Erro na atualização do livro", erro: erro.message });
        }
        });

async function deletarLivro(id) {
        try {
        const livroDeletado = await Livro.findByIdAndDelete(id);
        return livroDeletado;
        } catch (erro) {
        console.error("Erro ao deletar o livro selecionado:", erro);
        throw erro;
        }
        }
        
app.delete("/livros/:id", async (req, res) => {
        try {
        const { id } = req.params;
        const livroDeletado = await deletarLivro(id);
        if (livroDeletado) {
        res.status(200).json({ mensagem: "Livro deletado com sucesso", livro: livroDeletado });
        } else {
        res.status(404).json({ mensagem: "Livro não encontrado" });
        }
        } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao deletar livro", erro: erro.message });
        }
        });