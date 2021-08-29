const express = require('express');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, 'uploads/imagens')
    },
    filename: function (req, file, cb) {
        
        cb(null, file.originalname)
    }
})


const upload = multer({ storage })
const router = express.Router();

const UserController = require('./app/controllers/user_controller')

// middleware that is specific to this router

router.use(function (req, res, next) {

    // res.json('nao autenticado')
    
    next();
});




router.post('/login', UserController.login);


router.post('/registerUser', UserController.registerUser)

router.post('/sair', UserController.sair)

router.post('/registerImage', UserController.authAdm, upload.any(), UserController.registerImage)

router.get('/searchImage', UserController.authNormal, UserController.searchImage)


module.exports = router;