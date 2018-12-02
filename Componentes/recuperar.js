class recuperarSenha extends Componente {
  constructor() {
    super({ nome: "recuperarSenha", url: "#recuperarsenha", dados: {} });
  }

  Recuperar(e) {
    const email = VALOR('#usu')
    toggleModal("Recuperar senha", `
  Email enviado enviado para o endereço:${email} </br>
  <button class="btn" onclick="Messias.get('recuperarSenha').Login();fecharModal();">Entendido!</button>
  `)
    return false;
  }

  Login() {
    app.irPara("Login");
  }
  view() {
    return `
    <div class="container">
    <form #onSubmit=Recuperar(this)>
    <input class="campo" id='usu' type='email' placeholder='email'/>
    <button class="btn" type="submit" >Recuperar</button> 
    </form>
    </div>
    `;
  }
}

app.criarComponente(recuperarSenha);
