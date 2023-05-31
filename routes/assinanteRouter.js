const express = require('express');
const router = express.Router();
const assinanteController = require('../controllers/assinanteController');
const multer = require('multer');

const upload = multer();

router.get('/listar', assinanteController.listar);
router.get('/buscarUsuarios', assinanteController.buscarUsuarios);
router.get('/listarPorNome', assinanteController.listarPorNome);
router.get('/listarPorSobrenome', assinanteController.listarPorSobrenome);
router.get('/listarPorCidade', assinanteController.listarPorCidade);
router.get('/listarPorEstado', assinanteController.listarPorEstado);
router.get('/listarPorStatus', assinanteController.listarPorStatus);
router.post('/criar', upload.single('ImagemPerfil'), assinanteController.salvar);
router.get('/buscarPorId/:id', assinanteController.buscarPorId);
router.put('/atualizar/:id', assinanteController.atualizar);
router.delete('/excluir/:id', assinanteController.excluir);

module.exports = router;
