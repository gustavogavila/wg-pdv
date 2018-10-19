let $divNotaFiscal = document.getElementById('nota-fiscal');

const ativaBotoes = () => {
    let btnFinalizaVenda = document.createElement('button');
    btnFinalizaVenda.setAttribute('id', 'btn-finaliza-venda');
    btnFinalizaVenda.textContent = 'Finaliza Venda';

    let btnCancelaVenda = document.createElement('button');
    btnCancelaVenda.setAttribute('id', 'btn-cancela-venda');
    btnCancelaVenda.textContent = 'Cancelar';

    let divPainelPrincipal = document.getElementById('painel-principal');
    divPainelPrincipal.appendChild(btnFinalizaVenda);
    divPainelPrincipal.appendChild(btnCancelaVenda);
}

const geraNF = () => {

    let $fieldset = document.createElement('fieldset');

    let $legend = document.createElement('legend');
    $legend.textContent = 'Nota Fiscal';

    // Criando form de preenchimento de itens

    let $divFormItem = document.createElement('div');
    $divFormItem.setAttribute('id', 'form-item');

    let $labelForm01 = document.createElement('label');
    $labelForm01.textContent = 'Produto';

    let $selectForm01 = document.createElement('select');
    $selectForm01.setAttribute('id', 'produtos');
    $selectForm01.setAttribute('class', 'campo');

    let $optionDefault01 = document.createElement('option');
    $optionDefault01.setAttribute('value', '');
    $optionDefault01.textContent = '--Selecione--';

    let $labelForm02 = document.createElement('label');
    $labelForm02.textContent = 'Quantidade';

    let $selectForm02 = document.createElement('select');
    $selectForm02.setAttribute('id', 'quantProd');

    let $optionDefault02 = document.createElement('option');
    $optionDefault02.setAttribute('value', '1');
    $optionDefault02.textContent = '1';

    let $btnIncluiProduto = document.createElement('button');
    $btnIncluiProduto.setAttribute('id', 'inclui-produto');
    $btnIncluiProduto.textContent = 'Incluir';

    $selectForm01.appendChild($optionDefault01);
    $selectForm02.appendChild($optionDefault02);
    $divFormItem.appendChild($labelForm01);
    $divFormItem.appendChild($selectForm01);
    $divFormItem.appendChild($labelForm02);
    $divFormItem.appendChild($selectForm02);
    $divFormItem.appendChild($btnIncluiProduto);
    $fieldset.appendChild($legend);
    $fieldset.appendChild($divFormItem);

    // Criando tabela de itens

    let $divTabelaItens = document.createElement('div');
    $divTabelaItens.setAttribute('id', 'div-tabela-itens');

    let $tabelaItens = document.createElement('table');
    $tabelaItens.setAttribute('id', 'tabela-itens');
    $tabelaItens.setAttribute('border', '1');

    let $thead = document.createElement('thead');
    $thead.innerHTML = `
        <th>Produto</th>
        <th>Img</th>
        <th>Qtd</th>
        <th>Valor</th>
        <th>Total</th>
    `;

    let $tbody = document.createElement('tbody');
    let $tfoot = document.createElement('tfoot');

    let $tdTotal = document.createElement('td');
    $tdTotal.setAttribute('id', 'total-nota');
    $tdTotal.textContent = 'xxx,xx';

    $tfoot.innerHTML = `
        <td colspan="4" style="text-align:right">Total Nota R$</td>
        <td>${$tdTotal.innerHTML}</td>
    `
    $tabelaItens.appendChild($thead);
    $tabelaItens.appendChild($tbody);
    $tabelaItens.appendChild($tfoot);
    $divTabelaItens.appendChild($tabelaItens);

    $fieldset.appendChild($divTabelaItens);

    // Adicionando o form e a tabela de itens à $divNotaFiscal

    $divNotaFiscal.appendChild($fieldset);
}

const iniciaVenda = () => {
    ativaBotoes();
    geraNF();
}

let btnNovaVenda = document.getElementById('nova-venda');
btnNovaVenda.addEventListener('click', iniciaVenda);
