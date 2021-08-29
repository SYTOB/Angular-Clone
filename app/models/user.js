const fs = require('fs');

class user {

    registerUser(email, senha, tipo) {

        if(email || senha || tipo == ''){
            return false;
        }

        let rawdata = fs.readFileSync('./data/users.json');
        let student = JSON.parse(rawdata)

        const user_correto = student.filter(user => user.email == email);


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