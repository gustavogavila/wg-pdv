

class Tabela {
  constructor(nome) {
    this.tabela = nome;
    this.Dados = (log = false) => {
      let tabela = JSON.parse(localStorage.getItem(nome))
      if (log)
        console.table(tabela)
      else return tabela
    };
  }


  remover(por, valor = undefined) {
    let tabela = this.Dados();
    let novaTabela = tabela
    if (valor != undefined) {
    tabela.forEach((item, index) => {
      if (item[por] == valor) {
        novaTabela.splice(index, 1)
        localStorage.setItem(this.tabela, JSON.stringify(novaTabela))
      }
    });
  } else if (!isNaN(por)) { //se o "valor" não for fornecido e parametro "por" é um numero então procurar por index
  novaTabela.splice(por, 1)
  localStorage.setItem(this.tabela, JSON.stringify(novaTabela))
} else {
  return null
}
  }

  Buscar(por, valor = undefined) {
    let tabela = this.Dados();
    if (valor != undefined) {
      return tabela.filter(linha => {
        return linha[por] == valor;
      })
    } else if (!isNaN(por)) { //se o "valor" não for fornecido e parametro "por" é um numero então procurar por index
      return tabela[por];
    } else {
      return null
    }
  }


  sequencial(){
    let seq =  parseInt(JSON.parse(localStorage.getItem(`${this.tabela}_<sequencial>`)))
    seq = seq + 1;
    localStorage.setItem(`${this.tabela}_<sequencial>`, seq)
    return seq;
  }

  add(objeto) {

    let valorAtual = JSON.parse(localStorage.getItem(this.tabela));
    if (valorAtual) {
      let novoValor = (objeto instanceof Array) ? [...valorAtual, ...objeto] : [...valorAtual, objeto]
      localStorage.setItem(this.tabela, JSON.stringify(novoValor))
    } else {
      if (objeto instanceof Array)
        localStorage.setItem(this.tabela, JSON.stringify(...objeto))
      else
        localStorage.setItem(this.tabela, JSON.stringify([objeto]))
    }
  }


}
class Banco {
  constructor() {

  }
  criarTabela(nome) {
    localStorage.setItem(nome, JSON.stringify([]))
    localStorage.setItem(`${nome}_<sequencial>`, 0)
    return new Banco();
  }

  lerTabela(nome) {
    return new Tabela(nome)
  }
  Existe(nome) {
    let existe = localStorage.getItem(nome);
    return existe ? true : false;
  }
}