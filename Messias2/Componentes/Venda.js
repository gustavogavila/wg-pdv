class Venda extends Componente{
    constructor(){
        super({nome:'Venda',
               url:'#Venda',
                dados:{
                    produtos:tProdutos.Dados(),
                    venda:{
                        produtos:[],
                        total:0,
                        pago:0,
                        troco:0,
                        desconto:2,
                    },
                }})  
    }
    
   adicionarProduto(){
       let produtoSelecionado = tProdutos.Buscar('id',getVALOR('#produtoSelecionado'))[0];
       let quantidadeProduto = document.querySelector('#quantidadeProduto').value;
       if(produtoSelecionado){
       let produto = Object.assign({Quantidade:quantidadeProduto},produtoSelecionado)
       this.dados.venda.produtos.push(produto);
       this.update()
       }
   }
  
  finalizarVenda(){
      app.irPara('FinalizarVenda',this.dados)
  }
   



   update(){
    this.dados.venda.total = this.dados.venda.produtos.reduce((acc,cur)=>{
      let valorProduto =  cur.Valor*cur.Quantidade
      return acc+=valorProduto
    },0)
    app.montarView(); 
   }
   


   view(){
    return `<div class="pdv">
    <div class="col menu">
        <input class="campo campo-produto" placeholder="Produto" id="produtoSelecionado" list="produtos" name="produto" >
        <datalist id="produtos">
        #{produto de produtos}
        <option value="{produto.id}">{produto.Nome}</option>
        #
        </datalist>
        <input class="campo campo-quantidade" type="number" min="1" value="1" id="quantidadeProduto" name="Quantiade" >
        <button class="btn direita">Estoque</button>
        <button class="btn direita" #onclick=adicionarProduto() >Adicionar</button>
        
    </div>
    <div class="col detalhe">
        <table class="produtos">
            <thead>
                <tr>
                    <th width="75%">Produto</th>
                    <th width="15%">Valor</th>
                    <th width="10%">Quantidade</th>
                </tr>
            </thead>
            <tbody>
            #{produto de venda.produtos}
            <tr>
            <td>{produto.Nome}</td>
            <td>{produto.Valor}</td>
            <td>{produto.Quantidade}</td>
            </tr>
            #
            </tbody>
        </table>
    </div>
    <div class="col valores">

            <h1>Total:</h1>
            <h1>R$ {venda.total}</h1>

    </div>
    <div class="menu">
    <button class="btn direita" #onclick=finalizarVenda() >Cancelar Venda</button>
        <button class="btn direita" #onclick=finalizarVenda() >Finalizar Venda</button>
    </div>
</div> 
    `
}
}

app.criarComponente(Venda);
