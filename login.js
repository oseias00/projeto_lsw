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
            
        if(email.value === usuarios[i].email && senha.value === usuarios[i].senha){
            console.log('login efetuado com sucesso')
            localStorage.setItem("Sessão", usuarios[i].user)
            return true
        }
        else{
            console.log('--------------------------')
        }

        }


    }catch{
        exibeErro('Ainda não há nenhum usuário cadastrado') 
    }
  
    /*for(let i = 0; i<localStorage.length; i++){
        const objVazio = {email: 'obj vazio', senha: 'objvazio'}
        const chave = localStorage.key(i)
        const valor = localStorage.getItem(chave)

        //garante que 'Obj' vai receber apenas Objetos(tem um item no LocalStorage que determina o usuario da sessao)
        let Obj
        try{
            Obj = typeof JSON.parse(valor) === "object" ? JSON.parse(valor) : objVazio
        }
        catch(e){
            Obj = objVazio
        }
        
        
        console.log(chave)
        console.log(email.value , Obj.email)
        console.log(senha.value , Obj.senha)
       
        if(email.value === Obj.email && senha.value === Obj.senha){
            console.log('login efetuado com sucesso')
            localStorage.setItem("Sessão", Obj.user)
            return true
        }
        else{
            console.log('--------------------------')
        }
    
    }
    return false*/
   
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