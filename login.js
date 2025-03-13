//pegando elementos com input
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', e =>{
    e.preventDefault()
    if(!Login()) alert('erro de login')

    
})


function Login(){
  
    for(let i = 0; i<localStorage.length; i++){
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
            console.log('erro de login')
            console.log('--------------------------')
        }
    
    }
    return false
   
}