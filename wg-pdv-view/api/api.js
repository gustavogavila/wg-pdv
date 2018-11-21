
function logar(usuario,senha){
    let perfil = tVendedor.Buscar('usuario',usuario)[0]
    if(perfil && perfil.senha == senha){
        Messias.salvarSession({Nome:perfil.Nome,id:perfil.id})
        app.irPara('pdv',{Nome:perfil.Nome,id:perfil.id})
      }else{
          alert('usuario não existe em nossa base')
      }
    return true;
}

function finalizarVenda(dados){
let vendaObj = {
   valor:dados.venda.total,
   cliente_id:dados.cliente,
   vendedor_id:dados.vendedor.id,
   itensPedido:dados.venda.produtos.map(produto=>{
       return{desconto:0,quantidade:produto.Quantidade,preco:produto.Valor,produto_id:produto.id}
   })
}  
    console.log(JSON.stringify(vendaObj))
}