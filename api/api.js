const urlBase = "https://radiant-springs-46818.herokuapp.com/";

 function logar(usuario, senha) {
  const url = `${urlBase}vendedor/login.php`;
  const dados = {
    email:usuario,
     senha:senha
  }
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  }
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
function buscar_produtos() {
  return fetch(`${urlBase}produto/find-all.php`,{
    headers: { "content-type": "application/json" }
  })
    .then(resp => resp.json())
    .then(dados => dados);
}

//Envia dados do pedido/venda para base de dados
function finalizarVenda(dados) {
  let vendaObj = {
    valor: dados.venda.total,
    cliente_id: dados.cliente.id,
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

    fetch(`${urlBase}pedido/save.php`,{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(vendaObj)
    })
      .then(resp => resp.json())
      .then(dados => console.log(dados));
}

//busca o cliente por cpf
function buscarClientePorCPF(cpf) {
  const url = `${urlBase}cliente/find-by-cpf.php`;
  const dados = {
    cpf
  }
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  }
  return fetch(url,{
    method:"POST",
    headers:headers,
    body:JSON.stringify(dados)
  })
    .then(resp => resp.json())
    .then(dados => dados);
}

