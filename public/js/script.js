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

function perfilScreen(){
    
    

    
    if(document.getElementById('perfil-mode-active').style.visibility == "hidden"){
        pegaEmail();
        document.getElementById('perfil-mode-active').style.visibility = "visible";     
        
        document.getElementById('dark-mode-active').style.visibility = "visible";
    }
    else {
        zerar();
        document.getElementById('perfil-mode-active').style.visibility = "hidden";
        
        document.getElementById('dark-mode-active').style.visibility = "hidden";
    }
}

function searchScreen(){


    
        if(document.getElementById('search-mode-active').style.visibility == "hidden"){
            document.getElementById('search-mode-active').style.visibility = "visible";     

            document.getElementById('dark-mode-active').style.visibility = "visible";
        }
        else {
            zerar();
            document.getElementById('search-mode-active').style.visibility = "hidden";

            document.getElementById('dark-mode-active').style.visibility = "hidden";
        }
        

}

function loginScreen(){

    
    if(document.getElementById('login-mode-active').style.visibility == "hidden"){
        document.getElementById('login-mode-active').style.visibility = "visible";     
        
        document.getElementById('dark-mode-active').style.visibility = "visible";
    }
    else {
        zerar();
        document.getElementById('login-mode-active').style.visibility = "hidden";
        
        document.getElementById('dark-mode-active').style.visibility = "hidden";
    }
}

function registerScreen(){

    
    if(document.getElementById('register-mode-active').style.visibility == "hidden"){
        document.getElementById('register-mode-active').style.visibility = "visible";     

    }
    else {
        zerar();
        document.getElementById('register-mode-active').style.visibility = "hidden";
        

    }
}

function registerImageScreen(){



    if(localStorage.getItem('email')){

        if(document.getElementById('registerImage-mode-active').style.visibility == "hidden"){
            document.getElementById('registerImage-mode-active').style.visibility = "visible";     

        }
        else {
            document.getElementById('registerImage-mode-active').style.visibility = "hidden";


        }
    
    }
}
//-------------------------------------API------------------------------------------------

function search() {
    console.log("search!");
    
    searchScreen();

    
    aux = document.getElementById('myInput2').value;
    
    document.getElementById("mudaSrc").src=`/api/searchImage?originalname=${aux}`;
    
    

}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode === 13) {    
            console.log("Aqui chegou");
            search();

    }
}


function Login2(event) {

    
    event.preventDefault();
    
    if(!localStorage.getItem('email')){
        
        console.log("email: ",document.getElementById("inp_email").value);
        console.log("senha: ",document.getElementById("inp_password").value);
        
    
    fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("inp_email").value,
            senha: document.getElementById("inp_password").value
        })
      })
        .then(response => response.json())
        .then(response => localStorage.setItem('email', response.email))
        .then(response => loginScreen());    
        
       // .then(contact => localStorage.setItem('token', contact.token))
       // .then(response => verificaLogin());
                
    }else{
        
       falha();
        
    }
   
    
}

function registerUser(event) {

    event.preventDefault();
    
    let adm;
    
    if(!localStorage.getItem('token')){
        
        console.log("email: ",document.getElementById("register-username").value);
        console.log("senha: ",document.getElementById("register-password").value);
        
        if(document.getElementById("adm").checked){
            adm = 'adm';
        }else{
             adm = 'normal';
        }
        
    
    fetch('/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("register-username").value,
            senha: document.getElementById("register-password").value,
            tipo: adm
        })
      })
        .then(response => response.json())
        .then(response => response.result)
        .then(response => verificaCadastro(response));    
        
       // .then(contact => localStorage.setItem('token', contact.token))
       // .then(response => verificaLogin());
                
    }else{
        alert("Voce ja está logado!");
        
    }
   
    
}


function registerImage() {


    
    if(!localStorage.getItem('token')){
        
        const file = document.getElementById('upImage');
        console.log("file: ",file.files[0]);

        const data = new FormData();

        data.append('image', file.files[0]);
        
    
    fetch('/api/registerImage', {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
        .then(response => response.resulta)
        .then(response => sucesso(response));
        
       // .then(contact => localStorage.setItem('token', contact.token))
       // .then(response => verificaLogin());
                
    }else{
        alert("Voce ja está logado!");
        
    }
   
    
}



function verificaCadastro(aux){
    console.log("aux", aux);
    if(aux){
        sucesso();
        registerScreen();
    }else{
        falha();
    }
}

function verificaLogin2(){
    let aux = localStorage.getItem('user');
    let aux2 = JSON.parse(aux);
    
    localStorage.setItem("email",aux.email);

    
    localStorage.removeItem('user');
    

    
    
    loginScreen();


}

function pegaEmail(){
    var email = localStorage.getItem('email');
     document.getElementById("emailPerfil").innerHTML = email;
}


function logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('tipo');
    document.getElementById('aviso').innerHTML = '';
}

function falha(){
    document.getElementById('aviso').innerHTML = 'Algo deu errado, tente novamente.';
    document.getElementById('aviso2').innerHTML = 'Algo deu errado, tente novamente.';
    document.getElementById('aviso3').innerHTML = 'Algo deu errado, tente novamente.';
}

function sucesso(aux){

    console.log("aux", aux);
    
    if(aux){
        document.getElementById('aviso').innerHTML = 'Sucesso';
        document.getElementById('aviso2').innerHTML = 'Sucesso';
        document.getElementById('aviso3').innerHTML = 'Sucesso';
    }

}

function zerar(){
     document.getElementById('aviso').innerHTML = '';
    document.getElementById('aviso2').innerHTML = '';
    document.getElementById('aviso3').innerHTML = '';
}








