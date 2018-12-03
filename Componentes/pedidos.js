const cpfPattern = '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}'
class Pedidos extends Componente {
  constructor() {
    super({ nome: "Pedidos", url: "#pedidos", 
    dados: {
      pedidos:[] 
    } 

     });
  }

  inicializar() {
    app.verificarSession();
  }
  buscar(e){
    
   const cpf = VALOR('#cpf') 
   buscar_pedidosTodos(cpf).then(pedidos=>{
     this.dados.pedidos = pedidos;
     app.montarView();
   })
  
  }

  pdv() {
    app.irPara("pdv");
  }

  view() {
    return `
    <div class="pdv">
    <div class="col detalhe-menu">
    <form onSubmit='return false;'>
    <input class="campo pattern="${cpfPattern}"  campo-produto" placeholder="CPF" id="cpf"  name="pedido" >
    <button class="btn" #onclick=buscar(this)>Buscar</button>
    <button class="btn" #onclick=pdv()>Voltar</button>
    </form>
</div>
<div class="col detalhe">
        <table class="produtos">
            <thead>
                <tr>
                    <th width="20%">Pedido</th>
                    <th width="30%">Data</th>
                    <th width="20%">Qtd. Itens</th>
                    <th width="20%">Total</th>
                    <th width="20%">Situação</th>
                </tr>
            </thead>
            <tbody>
            #{pedido de pedidos}
               <tr>
                 <td>{{pedido.id}}</td>
                 <td>{{pedido.data}}</td>
                 <td>{{pedido.quant_itens}}</td>
                 <td>{{pedido.valor}}</td>
                 <td>FINALIZADO</td>
               </tr>
               #
               
            </tbody>
        </table>
    </div>
    </div>
    `;
  }
}

app.criarComponente(Pedidos);
