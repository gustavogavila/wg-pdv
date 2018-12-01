class Login extends Componente {
  constructor() {
    super({
      nome: "Login",
      url: "#Login",
      dados: { usuario: "", senha: "" }
    });
  }
  inicializar() {
    if (app.verificarSession()) {
      app.irPara("pdv", app.verificarSession());
    }
  }

  logar() {
    let usuario = VALOR("#usu");
    let senha = VALOR("#senha");
    logar(usuario, senha);
    return false;
  }

  recuperarSenha() {
    app.irPara("recuperarSenha");
  }

  view() {
    return `    
    <div class="login-pdv">
       <img src='./imgs/tapioca.png' class='logo'/>
       <h1 class='login-titulo'>Login</h1>
        <p>Usuario</p>
        <input class="campo" id='usu' type='text' placeholder='Usuario'/>
        <p>Senha</p>
        <input class="campo" id='senha' type='password' placeholder='Senha'/>
        <button class="btn btn-login"  #onClick=logar() >Logar</button> 
        <button type="button" class="btn btn-login" #onclick=recuperarSenha() >Esqueci minha senha</button>
        </div>
        `;
  }
}

app.criarComponente(Login);
