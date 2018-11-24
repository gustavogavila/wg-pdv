class Pedidos extends Componente {
  constructor() {
    super({ nome: "Pedidos", url: "#pedidos", dados: {} });
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
               <tr>
                 <td>1</td>
                 <td>18/11/2018 14:36</td>
                 <td>5</td>
                 <td>35,50</td>
                 <td>FINALIZADO</td>
               </tr>
            </tbody>
        </table>
    </div>
    </div>
    `;
  }
}

app.criarComponente(Pedidos);
