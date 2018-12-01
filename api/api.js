const urlBase = "https://radiant-springs-46818.herokuapp.com/";

 function logar(usuario, senha) {

  //   Messias.salvarSession({ Nome: perfil.Nome, id: perfil.id });
  //   app.irPara("pdv", { Nome: perfil.Nome, id: perfil.id });

  const url = `${urlBase}vendedor/login.php`;
  console.log(url)
  const dados = {
    email:usuario,
     senha:senha
  }
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }

  console.log(JSON.stringify(dados))
  fetch(url,{
    method:"POST",
    headers:headers,
    body:JSON.stringify(dados)
  })
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados)
      Messias.salvarSession({ Nome: dados.nome, id: dados.id });
      app.irPara("pdv", { Nome: dados.nome, id: dados.id });
    }).catch((err)=>console.log(err));


  return true;
}

//busca todos os produtos da api
function produtos() {
  return fetch({
    url: `${urlBase}produto/find-all.php`,
    headers: { "content-type": "application/json" }
  })
    .then(resp => resp.json())
    .then(({ dados }) => dados);
}

//Envia dados do pedido/venda para base de dados
function finalizarVenda(dados) {
  let vendaObj = {
    valor: dados.venda.total,
    cliente_id: dados.cliente,
    vendedor_id: dados.vendedor.id,
    itensPedido: dados.venda.produtos.map(produto => {
      return {
        desconto: produto.desconto,
        quantidade: produto.Quantidade,
        preco: produto.Valor,
        produto_id: produto.id
      };
    })
  };
  console.log(vendaObj);
  //  return fetch({
  //     url: `${urlBase}pedido/save.php`,
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(vendaObj)
  //   })
  //     .then(resp => resp.json())
  //     .then(({ dados }) => dados);
}

//busca o cliente por cpf
function buscarClientePorCPF(cpf) {
  //    return fetch({
  //         url: `${urlBase}cliente/find-by-cpf.php`,
  //         method:'POST',
  //         headers: { "content-type": "applicantion/json" },
  //         body:JSON.stringify({cpf})
  //       })
  //         .then(resp => resp.json())
  //         .then(({ dados }) => dados);

  let url = `https://jsonplaceholder.typicode.com/users/` + cpf;
  return fetch(url)
    .then(resp => resp.json())
    .then(dados => dados);
}
