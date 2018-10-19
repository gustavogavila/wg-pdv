// criar e ler  a tabela criada o.
let {criarTabela,Existe,lerTabela} = new Banco();

var tProdutos
// se a tabela não existe criar
if(!Existe('Produtos')){
tProdutos = criarTabela('Produtos').lerTabela('Produtos');
tProdutos.add([
{
    id:tProdutos.sequencial(),
    Nome:'Arroz Branco 1Kg',
    Valor:2.50,
},
{
    id:tProdutos.sequencial(),
    Nome:'Feijão Preto 1Kg',
    Valor:3.50,
},
{
    id:tProdutos.sequencial(),
    Nome:'Macarrão 1Kg',
    Valor:3.00,
},
{
    id:tProdutos.sequencial(),
    Nome:'Refrigerante Antartica 2L',
    Valor:4.50,
},

])

}else{
 // se existir apenas ler dados
 tProdutos = lerTabela('Produtos')   
}

var tCliente
if(!Existe('Cliente ')){
    tCliente = criarTabela('Cliente').lerTabela('Cliente');
    tCliente.add({cpf:'045.053.455-98',nome:'João da Silva'})
    tCliente.add({cpf:'075.785.385-19',nome:'Ana Cláudia'})
 }else{
    tCliente = lerTabela('Cliente')   
   }

   var tVenda
 if(!Existe('Venda')){
    tVenda = criarTabela('Venda').lerTabela('Venda');
 }else{
    tVenda = lerTabela('Produtos')   
   }