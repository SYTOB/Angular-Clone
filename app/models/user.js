const { Console } = require('console');
const fs = require('fs');

class user {

    registerUser(email, senha, tipo) {

        let rawdata = fs.readFileSync('./data/users.json');
        let student = JSON.parse(rawdata)

        const user_correto = student.filter(user => user.email == email);

        console.log("User encontrado: ",user_correto)

        if (user_correto.length > 0) {
            
            return false;
        }

        student.push({ email, senha, tipo })

        let data = JSON.stringify(student);

        fs.writeFileSync('./data/users.json', data);

        return true;


    }

    buscarUser(email, senha) {

        console.log("REdsfsd: ")

        let rawdata = fs.readFileSync('./data/users.json');
        let student = JSON.parse(rawdata)

        const user_correto = student.filter(user => user.email == email && user.senha == senha);

        if (user_correto.length > 0) {
            return user_correto[0];
        } else {
            return false;
        }

    }

}



module.exports = user;