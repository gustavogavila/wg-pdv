const urlBase = "http://localhost/wg-pdv-api/";

function logar(usuario, senha) {
  let perfil = tVendedor.Buscar("usuario", usuario)[0];
  if (perfil && perfil.senha == senha) {
    Messias.salvarSession({ Nome: perfil.Nome, id: perfil.id });
    app.irPara("pdv", { Nome: perfil.Nome, id: perfil.id });
  } else {
    alert("usuario não existe em nossa base");
  }
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
