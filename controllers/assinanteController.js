const Assinante = require('../models/assinanteModel');
const fs = require('fs');

class AssinanteController {
  async salvar(req, res) {
    try {
      const { buffer, mimetype } = req.file;
      const { id, Nome, Sobrenome, DataNascimento, Telefone, Endereço, Cidade, Estado, Status } = req.body;

      const assinante = new Assinante({
        id,
        Nome,
        Sobrenome,
        DataNascimento,
        Telefone,
        Endereço,
        Cidade,
        Estado,
        Status,
        ImagemPerfil: {
          data: buffer,
          contentType: mimetype
        }
      });

      await assinante.save();

      res.send('Assinante criado com sucesso!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao criar o assinante.');
    }
  }

  async listar(req, res) {
    const resultado = await Assinante.find({})
      .select('-_id id Nome Sobrenome Cidade Estado Status');
    res.status(200).json(resultado);
  }

  async buscarPorId(req, res) {
    const id = req.params.id;
    const resultado = await Assinante.findOne({ id: id });
    res.status(200).json(resultado);
  }

  async buscarUsuarios(req, res) {
    const { nome, sobrenome, cidade, estado, status } = req.query;
    const filtro = {};

    if (nome) {
      filtro.Nome = nome;
    }
    if (sobrenome) {
      filtro.Sobrenome = sobrenome;
    }
    if (cidade) {
      filtro.Cidade = cidade;
    }
    if (estado) {
      filtro.Estado = estado;
    }
    if (status) {
      filtro.Status = status;
    }

    const resultado = await Assinante.findOne(filtro).select('Nome');
    res.status(200).json(resultado);
  }

  async listarPorNome(req, res) {
    const { nome } = req.query;
    const resultado = await Assinante.find({ Nome: nome })
      .select('-_id id Nome Sobrenome Cidade Estado Status');
    res.status(200).json(resultado);
  }

  async listarPorSobrenome(req, res) {
    const { sobrenome } = req.query;
    const resultado = await Assinante.find({ Sobrenome: sobrenome })
      .select('-_id id Nome Sobrenome Cidade Estado Status');
    res.status(200).json(resultado);
  }

  async listarPorCidade(req, res) {
    const { cidade } = req.query;
    const resultado = await Assinante.find({ Cidade: cidade })
      .select('-_id id Nome Sobrenome Cidade Estado Status');
    res.status(200).json(resultado);
  }

  async listarPorEstado(req, res) {
    const { estado } = req.query;
    const resultado = await Assinante.find({ Estado: estado })
      .select('-_id id Nome Sobrenome Cidade Estado Status');
    res.status(200).json(resultado);
  }

  async listarPorStatus(req, res) {
    const { status } = req.query;
    const resultado = await Assinante.find({ Status: status })
      .select('-_id id Nome Sobrenome Cidade Estado Status');
    res.status(200).json(resultado);
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const _id = String((await Assinante.findOne({ id: id }))._id);
    const { buffer, mimetype } = req.file;
    const dadosAtualizados = {
      Telefone: req.body.Telefone,
      Endereço: req.body.Endereço,
      Cidade: req.body.Cidade,
      Estado: req.body.Estado,
      Status: req.body.Status,
      ImagemPerfil: {
        data: buffer,
        contentType: mimetype
      }
    };
    await Assinante.findByIdAndUpdate(_id, dadosAtualizados);
    res.status(200).send();
  }

  async excluir(req, res) {
    const id = req.params.id;
    const _id = String((await Assinante.findOne({ id: id }))._id);
    await Assinante.findByIdAndRemove(_id);
    res.status(200).send();
  }
}

module.exports = new AssinanteController();
