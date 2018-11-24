class Venda extends Componente {
  constructor() {
    super({
      nome: "Venda",
      url: "#Venda",
      dados: {
        produtos: tProdutos.Dados(),
        cliente: 0,
        venda: {
          produtos: [],
          total: 0,
          pago: 0,
          troco: 0,
          desconto: 0
        }
      }
    });
  }
  inicializar() {
    app.verificarSession();
    this.cliente();
    this.dados = {
      venda: {
        produtos: [],
        total: 0,
        pago: 0,
        troco: 0,
        desconto: 0
      }
    };
  }
  selecionarProduto(e, codigo = null) {
    let condicao = codigo ? e.keyCode == codigo : true;
    if (condicao) {
      if (VALOR("#produtoSelecionado")) {
        GET("#quantidadeProduto").value = "";
        this.proximoFoco("#quantidadeProduto");
      } else {
        this.proximoFoco("#produtoSelecionado");
      }
    }
  }

  adicionarProduto(e, codigo = null) {
    let condicao = codigo ? e.keyCode == codigo : true;
    if (condicao) {
      let produtoSelecionado = tProdutos.Buscar(
        "id",
        VALOR("#produtoSelecionado")
      )[0];
      let quantidadeProduto = document.querySelector("#quantidadeProduto")
        .value;
      if (produtoSelecionado) {
        let produto = Object.assign(
          { Quantidade: quantidadeProduto },
          produtoSelecionado
        );
        this.dados.venda.produtos.push(produto);
        this.update();
        this.proximoFoco("#produtoSelecionado");
      }
    }
  }
  proximoFoco(foco) {
    GET(foco).focus();
  }

  finalizarVenda() {
    app.irPara("FinalizarVenda", this.dados);
  }

  cliente() {
    let conteudo = `
    <div class="valores">
    <input class="campo" id='clienteCpf' type='text' placeholder='CPF cliente'/>
    <button class="btn" onclick="Messias.get('Venda').buscarCliente();">Pronto</button>
    </div>
    `;

    toggleModal("CPF CLIENTE", conteudo);
  }

  buscarCliente() {
    let cpf = VALOR("#clienteCpf");
    buscarClientePorCPF(cpf)
      .then(cliente => {
        this.dados.cliente = cliente;
        GET("#Cliente").textContent = `Cliente: ${cliente.name}`;
      })
      .catch(() => console.warn("cliente não encontrado"));
    fecharModal();
  }

  update() {
    this.dados.venda.total = this.dados.venda.produtos.reduce(
      (acc, cur) => (acc += cur.Valor * cur.Quantidade),
      0
    );
    app.montarView();
  }

  view() {
    return `<div class="pdv">
    <div class="col menu">
        <input class="campo campo-produto"  #onkeypress=selecionarProduto(event,13) placeholder="Produto" id="produtoSelecionado" list="produtos" name="produto" >
        <datalist  id="produtos">
        #{produto de produtos}
        <option  value="{produto.id}">{produto.Nome}</option>
        #
        </datalist>
        <input class="campo campo-quantidade" #onkeypress=adicionarProduto(event,13) type="number" min="1" value="1" id="quantidadeProduto" name="Quantiade" >
        <button class="btn " #onclick=adicionarProduto() >Adicionar</button>
        <h1 id='Cliente'>Cliente: Venda Sem Cliente</h1>
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
    `;
  }
}

app.criarComponente(Venda);
