
const btnEntrar = document.getElementById('enviar')



btnEntrar.addEventListener('click', e =>{
    e.preventDefault()
    //pegando os elementos do formulario
    const user = document.getElementById('user')
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')
    const confirmaSenha = document.getElementById('confirmaSenha')


    //se passar da validacao, cria um novo objeto Usuario e manda para o localStorage
    if(!valida(user.value, email.value, senha.value, confirmaSenha.value)){
        console.log('deu erro na situação')
        user.value = ''
        email.value = ''
        senha.value = ''
        confirmaSenha.value = ''
        return
    }
    else{
        const usuario = new Usuario(user.value, email.value, senha.value)
        const usuarioJson = JSON.stringify(usuario)
        localStorage.setItem(id(), usuarioJson)
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
    if(!validaNome(user, email)){
        alert('erro na valdicao de nome')
        return false

    }
    //valida se os campos de senha sao iguais
    if(senha !== confirmaSenha){
        alert('senha e confirma diferentes')
        return false
    }

    
    let maiusculo = 0
    let minusculo = 0
    let num = 0
    for(let caractere of senha){
        //verifica se é maiusculo
        if(caractere === caractere.toUpperCase() && isNaN(Number(caractere)) ) maiusculo++
        //verifica se é minusculo
        if(caractere !== caractere.toUpperCase() && isNaN(Number(caractere)) ) minusculo++
        //verifica se e numero
        if(caractere == Number(caractere)) num++

        
    }

    //verifica se tem ao menos uma letra maiuscula, minuscula e um numero
    if(maiusculo === 0 || num === 0 || minusculo === 0){
        alert('faltando maiscula, minusculo ou numero na senha')
        return false
    }


    return true
}

//verifica se ja tem alguem com o mesmo nome de usuario ou mesmo email
function validaNome(username, userEmail){
    for(let i = 0; i<localStorage.length; i++){
        console.log(i)
        const chave = localStorage.key(i)
        const valor = localStorage.getItem(chave)
        const Obj = JSON.parse(valor)
        console.log('tamanho:' , localStorage.length)

        if(Obj.user === username){
            alert('nome de usuario ja existe')
            return false
        } 

        if(Obj.email === userEmail){
            alert('email ja existe')
            return false
        }
    }

    return true
}

//gera um novo numero para ser usado como chave no localStorage
function id(){
 return (localStorage.length + 1)
}

//cria hash de senha

