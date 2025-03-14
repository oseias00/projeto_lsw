//import
import bcrypt from "bcryptjs"


//pegando elementos com input
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', e =>{
    if (!btnLogin.checkValidity()) {
        return;
    }
    e.preventDefault()
    if(!Login())  exibeErro('Email e/ou senha incorretos')

    
})


function Login(){

    try{
        let usuarios = localStorage.getItem('usuarios')
        usuarios  = JSON.parse(usuarios)
        for(let i = 0; i<usuarios.length; i++){
        const isMatch = bcrypt.compareSync(senha.value, usuarios[i].senha)
            
        if(email.value === usuarios[i].email && isMatch){
            console.log('login efetuado com sucesso')
            localStorage.setItem("Sessão", usuarios[i].user)
            window.location.href = 'interface.html';
            return true
        }
        else{
            console.log('--------------------------')
        }

        }


    }
    catch(e){
        console.log(e)
        exibeErro('Ainda não há nenhum usuário cadastrado') 
    }
  
   
}

function exibeErro(erro){
    const divErros =  document.getElementById('erros')
    const listaErros = document.getElementById('listaErr')
    const li = document.createElement('li')
    li.innerHTML = erro
    listaErros.appendChild(li)
    divErros.style.display = 'block'

    setTimeout(() => {
        listaErros.removeChild(li)
         divErros.style.display = 'none'
    }, 6000);
}