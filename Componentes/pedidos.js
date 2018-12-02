class Pedidos extends Componente {
  constructor() {
    super({ nome: "Pedidos", url: "#pedidos", 
    dados: {
      pedidos:[
        {
          id:"0",
          data:"2018-11-17",
          quant_itens:5,
          valor:200
        }
      ] 
    } 

     });
  }

  inicializar() {
    app.verificarSession();
  }
  pdv() {
    app.irPara("pdv");
  }

  view() {
    return `
    <div class="pdv">
    <div class="col detalhe-menu">
    <input class="campo campo-produto" placeholder="CPF" id="cpf"  name="produto" >
    <button class="btn" >Buscar</button>
    <button class="btn" #onclick=pdv()>Voltar</button>
    
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
                 <td>{pedido.id}</td>
                 <td>{pedido.data}</td>
                 <td>{pedido.quant_itens}</td>
                 <td>{pedido.valor}</td>
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
