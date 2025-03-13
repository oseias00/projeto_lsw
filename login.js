//pegando elementos com input
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', e =>{
    e.preventDefault()
    Login()

    
})


function Login(){
  
  for(let i = 0; i<localStorage.length; i++){

    const chave = localStorage.key(i)
    const valor = localStorage.getItem(chave)
    const Obj = JSON.parse(valor)
  
    if(email.value === Obj.email && senha.value === Obj.senha){
        console.log('login efetuado com sucesso')
        return
    }else{
        console.log('erro de login')
    }
}

   
}