/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function button_hamb(){
    if(document.getElementById('sidebar').style.display == "none"){
        document.getElementById('sidebar').style.display = "block";
    }else{
        document.getElementById('sidebar').style.display = "none";
    }
    
}

function loginScreen(){

    
    if(document.getElementById('login-mode-active').style.visibility == "hidden"){
        document.getElementById('login-mode-active').style.visibility = "visible";     
        
        document.getElementById('dark-mode-active').style.visibility = "visible";
    }
    else {
        document.getElementById('login-mode-active').style.visibility = "hidden";
        
        document.getElementById('dark-mode-active').style.visibility = "hidden";
    }
}

function registerScreen(){

    
    if(document.getElementById('register-mode-active').style.visibility == "hidden"){
        document.getElementById('register-mode-active').style.visibility = "visible";     

    }
    else {
        document.getElementById('register-mode-active').style.visibility = "hidden";
        

    }
}
//-------------------------------------API------------------------------------------------

function getUsers() {
    console.log("getUsers!");

    var myInit = {
        method: 'GET',
        headers: {'Accept': 'application/vnd.github.v3+json', 'Content-type': 'application/json'}

    };
    
    let input = document.getElementById('myInput').value;

    fetch(`https://api.github.com/users/${input}`,myInit)
            .then(response => response.json())
            .then(contact => userFound(contact));
    

}

function userFound(contact){

    if(contact.message == 'Not Found'){
        
        alert("Usuário não existe!");

    }else{
        alert("Usuário Encontrado!"+"\n"+"Login: "+contact.login+"\n"+"ID: "+contact.id);
    }

}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        if(localStorage.getItem('token')){
            //getJobs();
            getUsers();
        }else{
            alert("Necessário login!");
            loginScreen();
        }

    }
}

function Login(event) {
    console.log("entrou!");
    event.preventDefault();
    
    if(!localStorage.getItem('token')){
    
    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
            email: document.getElementById("inp_email").value,
            password: document.getElementById("inp_password").value
        })
      })
        .then(response => response.json())
        .then(contact => localStorage.setItem('token', contact.token))
        .then(response => verificaLogin());
                
    }else{
        alert("Voce ja está logado!");
        
    }
    

    
}

function verificaLogin(){
    if(localStorage.getItem('token') === 'undefined'){
        alert("Login ou senha incorretos!");
        localStorage.removeItem('token');
    }
    else{
        loginScreen();
        alert("Login efetuado com sucesso!");
    }
}

function logout(){
    localStorage.removeItem('token');
}








