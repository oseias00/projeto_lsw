const btnEntrar = document.getElementById('enviar')
const arrayErros = []
const formulario = document.getElementById('formulario')
const divErros =  document.getElementById('erros')
btnEntrar.addEventListener('click', e =>{

    if (!formulario.checkValidity()) {
        // O navegador exibirá os erros normalmente
        return;
    }
    
    e.preventDefault()
    //pegando os elementos do formulario
    const user = document.getElementById('user')
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')
    const confirmaSenha = document.getElementById('confirmaSenha')


    //se passar da validacao, cria um novo objeto Usuario e manda para o localStorage
    valida(user, email, senha, confirmaSenha)
    if(arrayErros.length > 0){
        
        for(let err of arrayErros){
            console.log(err)
            exibeErro(err)
            arrayErros.shift(err)
        }

        return
    }
    else{
        const usuario = new Usuario(user.value, email.value, senha.value)
        const usuarioJson = JSON.stringify(usuario)
        localStorage.setItem(id(), usuarioJson)
        divErros.style.display = 'none'
       

        alert('cadastroCriado')
    }

   


})

class Usuario{
    constructor(user, email, senha){
        this.user = user
        this.email = email
        this.senha = senha
    }

}
    function valida(user, email, senha, confirmaSenha){
    //valida se o nome de usuario já existe
    if(!validaNome(user, email)) return false

    
    //valida se os campos de senha sao iguais

    if(senha.value !== confirmaSenha.value){
        arrayErros.push('senha e confirmação de senha diferentes')
        senha.value = ''
        confirmaSenha.value = ''
        //return false
    }

    
    let maiusculo = 0
    let minusculo = 0
    let num = 0
    for(let caractere of senha.value){
        //verifica se é maiusculo
        if(caractere === caractere.toUpperCase() && isNaN(Number(caractere)) ) maiusculo++
        //verifica se é minusculo
        if(caractere !== caractere.toUpperCase() && isNaN(Number(caractere)) ) minusculo++
        //verifica se e numero
        if(caractere == Number(caractere)) num++

        
    }

    //verifica se tem ao menos uma letra maiuscula, minuscula e um numero
    if(maiusculo === 0 || num === 0 || minusculo === 0){
        arrayErros.push('SENHA: faltando maiuscula, minusculo ou numero')
        senha.value = ''
        confirmaSenha.value = ''
        //return false
    }


    
}

//verifica se ja tem alguem com o mesmo nome de usuario ou mesmo email
function validaNome(username, userEmail){
    for(let i = 0; i<localStorage.length; i++){
        console.log(i)
        const chave = localStorage.key(i)
        const valor = localStorage.getItem(chave)
        const Obj = JSON.parse(valor)
        console.log('tamanho:' , localStorage.length)

        if(Obj.user === username.value){
            arrayErros.push('nome de usuario ja existe')
            user.value = ''
            return false
        } 

        if(Obj.email === userEmail.value){
            arrayErros.push('email ja existe')
            email.value = ''
            return false
        }
    }

    return true
}

//gera um novo numero para ser usado como chave no localStorage
function id(){
 return (localStorage.length + 1)
}


function exibeErro(erro){
    const listaErros = document.getElementById('listaErr')

    const li = document.createElement('li')
    li.innerHTML = erro
    listaErros.appendChild(li)
    divErros.style.display = 'block'

    setTimeout(() => {
        listaErros.removeChild(li)
    }, 18000);
}

//cria hash de senha

