class Login extends Componente{
    constructor(){
        super({
               nome:'Login',
               url:'#Login',
               dados:{usuario:'',senha:''}
              })
            }

            logar(){

                 let usuario = getVALOR('#usu');
                 let senha = getVALOR('#senha')
                 let perfil = tVendedor.Buscar('usuario',usuario)[0]
    
                  if(perfil && perfil.senha == senha){
                    app.irPara('pdv',{Nome:perfil.Nome})
                  }else{
                      alert('usuario não existe em nossa base')
                  }
                  return false;
            }

            recuperarSenha(){
                app.irPara('recuperarSenha')
            }
                   

    view(){
        return `    
    <div class="container">
        <form #onSubmit=logar()>
        
        <input class="campo" id='usu' type='text' placeholder='usuario'/>
        <input class="campo" id='senha' type='password' placeholder='senha'/>
        <button class="btn" type="submit" >Logar</button> 
        <button type="button" class="btn" #onclick=recuperarSenha() >Esqueci minha senha</button>
        </form>
        </div>
        `
    }

}

app.criarComponente(Login)