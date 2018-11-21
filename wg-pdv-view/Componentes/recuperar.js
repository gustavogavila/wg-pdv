class recuperarSenha extends Componente{
    constructor(){
        super({nome:'recuperarSenha',
               url:'#recuperarsenha',
                dados:{}})  
    }
    
    Recuperar(){
        alert('email para recuperação de senha enviados')
    }


   view(){
    return `
    <div class="container">
    <form #onSubmit=Recuperar()>
    
    <input class="campo" id='usu' type='email' placeholder='email'/>
    <button class="btn" type="submit" >Recuperar</button> 
    </form>
    </div>
    `
}
}

app.criarComponente(recuperarSenha);
