const btnEntrar = document.getElementById('enviar')

btnEntrar.addEventListener('click', e =>{
    e.preventDefault()
    //pegando os elementos do formulario
    const user = document.getElementById('user')
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')
    const confirmaSenha = document.getElementById('confirmaSenha')


    console.log(user.value, email.value, senha.value, confirmaSenha.value)

    //se passar da validacao, cria um novo objeto Usuario
    if(!valida(user.value, email.value, senha.value, confirmaSenha.value)){
        alert('deu erro na situação')
        
    }
    else{
        alert('situacao deu certo')
        const u1 = new Usuario(user.value, email.value, senha.value)
        console.log(u1)

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
    //valida

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

    console.log('maiucsulo: ', maiusculo, 'num: ', num, 'minusculo:', minusculo)
    //verifica se tem ao menos uma letra maiuscula, minuscula e um numero
    if(maiusculo === 0 || num === 0 || minusculo === 0){
        alert('faltando maiscula, minusculo ou numero na senha')
        return false
    }


    alert('tudo ok')
    return true
    
}