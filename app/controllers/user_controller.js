
var ExpressJWT = require('express-jwt');

'use strict';

const fs = require('fs');

const User = require('../models/user')

// console.log("dir name",rawdata)

class UserController {

    login(req, res) {

        const { email, senha} = req.body;

        const user = new User();

        const retorno = user.buscarUser(email, senha);



        const adm = retorno.tipo;
        



        if (retorno) {

            req.session.isAuth = true;
            console.log("LOGIN normal: ", req.session.isAuth)

            if (adm == 'adm') {
                req.session.isAdm = true;
                console.log("LOGIN adm: ", req.session.Adm)
            }


            res.send(200, { "result": true, "email": retorno.email })


        } else {
            res.send(200, { "result": false })
        }

    }

    authAdm(req, res, next) {
        console.log("ADM: ", req.session.isAdm)
        if (req.session.isAdm) {

            next()
        } else {
            res.send(200, { "resulta": false })
        }

    }

    authNormal(req, res, next) {

        console.log("normal: ", req.session.isAuth)

        if (req.session.isAuth) {

            next()
        } else {

            res.send(200, { "result": false })
        }

    }



    registerUser(req, res) {

        const { email, senha, tipo } = req.body;

        const user = new User();

        const retorno = user.registerUser(email, senha, tipo);


        if (retorno) {
            res.send(200, { "result": true })
        } else {
            res.send(200, { "result": false })
        }

    }

    registerImage(req, res) {

        console.log("REQ", req);

        res.send(200, { "resulta": true })



    }

    sair(req, res){
        req.sessoion.destroy();
    }

    searchImage(req, res) {


        // console.log("FILES", req.files)
        let aux = req.query.originalname

        console.log("leitura: ", aux)

        if (/.(png)$/.test(`./uploads/imagens/${aux}`)) {
            // res.writeHead(200, {'Content-Type': 'foto/png'});

            let rawdata = fs.readFileSync(`./uploads/imagens/${aux}`);

            res.statusCode = 501;
            res.writeHead(200, { 'Content-Type': 'image/png' });
            return res.end(rawdata, 'utf-8');

        } else if (/.(jpg)$/.test(`./uploads/imagens/${aux}`)) {
            let rawdata = fs.readFileSync(`./uploads/imagens/${aux}`);

            res.statusCode = 501;
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            return res.end(rawdata, 'utf-8');
        }



        console.log("Encontrado: ", rawdata);

        res.status(200).json("Buscando")


    }


}

module.exports = new UserController();