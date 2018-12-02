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
function finalizarVenda({ cliente, venda,vendedor }) {

  let vendaObj = {
    valor: venda.total.toString(),
    cliente_id: cliente.id?cliente.id:"1",
    vendedor_id: vendedor.id.toString(),
    itensPedido: venda.produtos.map(produto => {
      return {
        desconto: produto.desconto?produto.desconto.toFixed(2):"0.0",
        quantidade: produto.Quantidade,
        preco: produto.preco,
        produto_id: produto.id
      };
    })
  };
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  }
    fetch(`${urlBase}pedido/save.php`,{
      method: "POST",
      headers: headers,
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


function buscar_pedidos(inicio,fim){
  const url = `${urlBase}pedido/find-by-period.php?dataInicial=${inicio}&dataFinal=${fim}`;
  return fetch(url)
    .then(resp => resp.json())
    .then(dados => dados);
}

function buscar_pedidosTodos(inicio,fim){
  const url = `${urlBase}pedido/find-by-period.php?dataInicial=${inicio}&dataFinal=${fim}`;
  return fetch(url)
    .then(resp => resp.json())
    .then(dados => dados);
}