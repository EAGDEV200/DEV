const mongoose = require('mongoose');

const assinanteSchema = new mongoose.Schema({
  id: { type: Number },
  Nome: { type: String },
  Sobrenome: { type: String },
  DataNascimento: { type: Date },
  Telefone: { type: String },
  Endereço: { type: String },
  Cidade: { type: String },
  Estado: { type: String },
  Status: { type: String },
  ImagemPerfil: {
    data: { type: Buffer },
    contentType: { type: String }
  }
});

const Assinante = mongoose.model('Assinante', assinanteSchema);

module.exports = Assinante;
