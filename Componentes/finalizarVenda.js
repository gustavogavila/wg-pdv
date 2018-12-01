let conteudoModal = (valor, Troco) => `
<div class="valores">
<h1>Pago  : R$ ${valor}</h1>
<h1>Troco : R$ ${Troco}</h1>
<hr/>
<button class="btn" onclick="Messias.get('FinalizarVenda').finalizar();">Nova Venda!</button>
</div>
`;
let ALERTA_VALOR_MENOR = () =>
  toggleModal("Pagamento", "Valor pago menor que o devido");
let ALERTA_PAGAMENTO = (valor, Troco) =>
  toggleModal("Pagamento", conteudoModal(valor, Troco));

class FinalizarVenda extends Componente {
  constructor() {
    super({
      nome: "FinalizarVenda",
      url: "#finalizarvenda",
      dados: null
    });
  }
  inicializar() {
    this.dados.vendedor = app.verificarSession();
  }

  pagar() {
    let valor = VALOR("#clienteValor");
    if (parseFloat(valor) < this.dados.venda.total) {
      ALERTA_VALOR_MENOR();
    } else {
      let Troco = Math.abs(this.dados.venda.total - valor);
      ALERTA_PAGAMENTO(valor, Troco);
    }
  }
  finalizar() {
    fecharModal();
    finalizarVenda(this.dados);
    app.irPara("Venda");
  }

  view() {
    return `    
    <div class="valores">
    <h1>VENDEDOR : {vendedor.id}</h1>
    <h1>CLIENTE  : {cliente.id}</h1>
    <hr/>

    
        <h2>Total: R$ {venda.total}</h2>
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
    <input class="campo" id='clienteValor' type='number' step='.1' placeholder='Valor Pago'/>
    <button type="button" class="btn" #onclick=pagar()>Finalizar</button>
        </div>
        `;
  }
}

app.criarComponente(FinalizarVenda);
