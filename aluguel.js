
const express = require ("express");
const mongoose = require ("mongoose");

const app = express();
app.use (express.json());

mongoose

.connect("mongobd://localhost:27017/express2")
 .thenn(() => console.log("Conectado ao MongoDB"))
  .catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

const esquemaAluguel = new mongoose.Schema({
    id: { type: String, required: true },
    idLivro: { type: String, required: true },
    idEstudante: { type: String, required: true},
    dataAluguel: { type: String, required: true},
    dataDevolucao: { type: String, required: true},
});

const aluguel = mongoose.model ("Livro", esquemaLivro);

async function criarAluguel(id, idLivro, idEstudante, dataAluguel, dataDevolucao){
    try{
        const novoAluguel = new Aluguel ({id, idLivro, idEstudante, dataAluguel, dataDevolucao});
          return await novoAluguel.save();
    } catch (erro) {
        console.error ("Erro ao criar Aluguel:", erro);
        throw erro;
    }
}

app.post("/aluguel", async (req, res) => {
    try {
      const { id, idLivro, idEstudante, dataAluguel, dataDevolucao } = req.body;
      const novoAluguel = await criarAluguel(id, idLivro, idEstudante, dataAluguel, dataDevolucao);
      res
        .status(201)
        .json({ mensagem: "Aluguel criado com sucesso", Aluguel: novoAluguel });
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar aluguel", erro: erro.message });
    }
  });
  
  async function obterAluguel() {
    try {
      return await Aluguel.find();
    } catch (erro) {
      console.error("Erro ao obter aluguel:", erro);
      throw erro;
    }
  }
  
  app.get("/aluguel", async (req, res) => {
    try {
      const aluguel = await obterAluguel();
      res.status(200).json(aluguel);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao obter aluguel", erro: erro.message });
    }
  });
  
  async function atualizarAluguel(id, idLivro, idEstudante, dataAluguel, dataDevolucao) {
    try {
      const AluguelAtualizado = await aluguel.findByIdAndUpdate(
        id,
        { idLivro, idEstudante, dataAluguel, dataDevolucao },
        { new: true, runValidators: true }
      );
      return AluguelAtualizado;
    } catch (erro) {
      console.error("Erro ao atualizar aluguel:", erro);
      throw erro;
    }
  }
  
  app.put("/aluguel/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { idLivro, idEstudante, dataAluguel, dataDevolucao} = req.body;
      const AluguelAtualizado = await atualizarAluguel(
        id,
        idLivro, 
        idEstudante, 
        dataAluguel, 
        dataDevolucao
      );
      if (AluguelAtualizado) {
        res
          .status(200)
          .json({
            mensagem: "Aluguel atualizado com sucesso",
            aluguel: AluguelAtualizado,
          });
      } else {
        res.status(404).json({ mensagem: "Aluguel não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao atualizar aluguel", erro: erro.message });
    }
  });
  
  async function deletarAluguel(id) {
    try {
      const AluguelDeletado = await Aluguel.findByIdAndDelete(id);
      return AluguelDeletado;
    } catch (erro) {
      console.error("Erro ao deletar aluguel:", erro);
      throw erro;
    }
  }
  
  app.delete("/aluguel/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const aluguelDeletado = await deletarLivro(id);
      if (aluguelDeletado) {
        res
          .status(200)
          .json({ mensagem: "Aluguel deletado com sucesso", aluguel: aluguelDeletado });
      } else {
        res.status(404).json({ mensagem: "Aluguel não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao deletar aluguel", erro: erro.message });
    }
  });
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
  