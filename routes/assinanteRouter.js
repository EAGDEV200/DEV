const express = require('express');
const router = express.Router();
const assinanteController = require('../controllers/assinanteController');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

// Rota para exibir o formulário de upload
router.get('/upload', function(req, res) {
  res.render('upload-form'); // renderiza o arquivo de visualização (view) para exibir o formulário
});

// Rota para lidar com o envio do formulário
router.post('/upload', upload.single('imagem'), assinanteController.salvar);
router.get('/listar', assinanteController.listar);
router.get('/buscarUsuarios', assinanteController.buscarUsuarios);
router.get('/buscarPorId/:id', assinanteController.buscarPorId);
router.put('/atualizar/:id', assinanteController.atualizar);
router.delete('/excluir/:id', assinanteController.excluir);

module.exports = router;
