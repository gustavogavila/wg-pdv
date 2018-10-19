let listaVenda = [];
let venda = {
   Pago:0,
   Troco:0,
   Total:0
}


// motando lista de produtos

let listaProdutos = document.querySelector('#produtos');
let produtos = tProdutos.Dados();
templateListaProdutos = () =>produtos.map(produto => `<option value="${produto.id}">${produto.Nome}</option>`).join(' ')

listaProdutos.innerHTML = templateListaProdutos();

// adicionando produtos a venda

let addVendaBtn = document.querySelector('#addVenda');
addVendaBtn.addEventListener('click',()=>{
let produtoSelecionado = document.querySelector('#produtoSelecionado')
let quantidadeProduto = document.querySelector('#quantidadeProduto')
listaVenda.push({...tProdutos.Buscar('id',produtoSelecionado.value)[0],quantidade:quantidadeProduto.value})
produtoSelecionado.value = "";
atualizarPDV();
})

atualizarPDV=()=>{
    let produtosVenda = document.querySelector('#produtosVenda');
    let total = document.querySelector('#total');
    let troco = document.querySelector('#troco');
    let pago = document.querySelector('#pago');

    produtosVenda.innerHTML = listaVenda.map(produto=>{
        return `<tr>
        <td>${produto.Nome}</td>
        <td>${produto.Valor}</td>
        <td>${produto.quantidade}</td>
        </tr>`
    }).join('')
        
    venda.Total  = listaVenda.reduce((acc,val)=> acc + (parseFloat(val.Valor) * parseFloat(val.quantidade)),0)

    total.innerHTML = venda.Total;
    troco.innerHTML = venda.Troco;
    pago.innerHTML = venda.Pago;
        
}
