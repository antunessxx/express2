const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
.connect("mongodb://localhost:27017/livraria")
.then(() => console.log("Conectado ao MongoDB"))
.catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));
const esquemaAluguel = new mongoose.Schema({
    idLivro: { type: String, required: true },
    idEstudante: { type: String, required: true },
    dataAluguel: { type: String, required: true },
    dataDevolucao: { type: String, required: true },
  });
 
  const Aluguel = mongoose.model("Aluguel", esquemaAluguel);
  async function criarAluguel(id, idLivro, idEstudante, dataAluguel, dataDevolucao) {
    try {
      const novoAluguel = new Aluguel({ id, idLivro, idEstudante, dataAluguel, dataDevolucao });
      return await novoAluguel.save();
    } catch (erro) {
      console.error("Erro ao criar Aluguel:", erro);
      throw erro;
    }
  }
  
  app.post("/aluguel", async (req, res) => {
    try {
      const { id, idLivro, idEstudante, dataAluguel, dataDevolucao } = req.body;
      const novoAluguel = await criarAluguel(id, idLivro, idEstudante, dataAluguel, dataDevolucao);
      res.status(201).json({ mensagem: "Aluguel criado com sucesso", aluguel: novoAluguel });
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao criar aluguel", erro: erro.message });
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
      res.status(500).json({ mensagem: "Erro ao obter aluguel", erro: erro.message });
    }
  });
  
  async function atualizarAluguel(id, idLivro, idEstudante, dataAluguel, dataDevolucao) {
    try {
      const AluguelAtualizado = await Aluguel.findByIdAndUpdate(
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
      const { idLivro, idEstudante, dataAluguel, dataDevolucao } = req.body;
      const AluguelAtualizado = await atualizarAluguel(id, idLivro, idEstudante, dataAluguel, dataDevolucao);
      if (AluguelAtualizado) {
        res.status(200).json({ mensagem: "Aluguel atualizado com sucesso", aluguel: AluguelAtualizado });
      } else {
        res.status(404).json({ mensagem: "Aluguel não encontrado" });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao atualizar aluguel", erro: erro.message });
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
      const aluguelDeletado = await deletarAluguel(id);
      if (aluguelDeletado) {
        res.status(200).json({ mensagem: "Aluguel deletado com sucesso", aluguel: aluguelDeletado });
      } else {
        res.status(404).json({ mensagem: "Aluguel não encontrado" });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao deletar aluguel", erro: erro.message });
    }
  });
    
    async function criarEstudante(nome,matricula,curso,ano) {
      try{
          const novoEstudante = new Estudante ({ nome, matricula, curso, ano})
          return await novoEstudante.save();
      } catch (erro) {
          console.error("Erro ao adicionar estudante:", erro);
          throw erro;
    }
  };
  
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
     const port = 3000;
     app.listen(port, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
     
  