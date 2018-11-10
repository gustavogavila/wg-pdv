let Componentes = {}

class Messias {
    constructor(seletor, main) {
        this.appElement = document.querySelector(seletor);
        this.main = main
        this.rotas = []
        this.handleRota = this.handleRota.bind(this)
        window.addEventListener('hashchange', this.handleRota)
        window.addEventListener('DOMContentLoaded', this.handleRota)
    }
    criarComponente(ComponenteClass) {
        let Componente = new ComponenteClass();
        Componentes[Componente.nome] = Componente;
        if (Componente.url)
            this.rotas.push({
                nome: Componente.nome,
                url: Componente.url
            })
    }
    static get(nome) {
        return Componentes[nome]
    }
    renderizar(nome) {
        this.componenteAtual = Componentes[nome];
        this.componenteAtual.inicializar();
        this.montarView();
    }

    montarView() {
        let dados = this.componenteAtual.dados;
        let view = capturaArrays(this.componenteAtual.view(), dados, this.stack);
        view = getInstancia(view, this.componenteAtual.nome);
        this.appElement.innerHTML = replaceDados(view, dados);
    }
    irPara(nome, dados = null) {
        let comp = Componentes[nome]
        console.log(nome,comp,Componentes)
        if (dados) {
            let compDados = comp.dados || {}
            comp.dados = Object.assign(compDados, dados);
         }
        this.componenteAtual = comp
        window.location.hash = this.componenteAtual.url
        this.componenteAtual.inicializar();
        this.montarView();
    }
    handleRota() {
        let hash = window.location.hash;
        const route = this.rotas.filter(route => hash.match(new RegExp(route.url)))[0]

        if (route) {
            this.renderizar(route.nome)
            window.location.hash = this.componenteAtual.url
        } else {
            this.renderizar(this.main)
            window.location.hash = this.componenteAtual.url
        }
    }
}


class Componente {
    constructor({
        nome,
        dados,
        url
    }) {
        this.nome = nome;
        this.dados = dados;
        this.url = url;
    }
    inicializar() {}
    view() {
        return '';
    }


}



// parser dados

//subtituir #evento="" por app.get('') para poder instanciar o componente 
getInstancia = (str, nome) => {
    let regexEvento = /#on(.*?)=(.*?)\((.*?)\)/g
    let match = str.match(regexEvento) || []
    match.map(reg => {
        let partes = /#on(.*?)=(.*?)\((.*?)\)/g.exec(reg)
        let evento = partes[1];
        let metodo = partes[2];
        let parametros = partes[3];
        str = str.replace(partes[0], `on${evento}="Messias.get('${nome}').${metodo}(${parametros})"`)
    })
    return str;
}

// capturar as 'tags' #{<valor de array>} e executar como 'for of'
capturaArrays = (str, dados, stack) => {
    let regex = /#\{.*?\}([\s\S]*?)#/g

    let match = str.match(regex) || []
    match.forEach(strArr => {
        str = str.replace(strArr, gerarArray(strArr, dados))
    });
    return str;
}

gerarArray = (str, objeto) => {
    let partes = /#(\{(.*de.*)\})([\s\S]*?)#/.exec(str)
    let argumentos = partes[2].split('de').map(trim => trim.trim())
    let corpo = partes[3]
    let newCorpo = '';

    for (const iterator of getKey(argumentos[1], objeto)) {
        newCorpo += corpo.replace(new RegExp('\{(.*?)\}', 'g'), (ig, prop) => {
            let chave = prop.replace(`${argumentos[0]}.`, '')
            let valor = iterator[chave]
            return valor ? valor : iterator;
        })
    }

    return newCorpo;
}

// replace dados

replaceDados = (view, dados) => {
    return view.replace(/\{(.*)\}/g, (ignorar, chave) => {
        if (dados[chave] instanceof Array) {
            //nada
        } else {
            return getKey(chave, dados)
        }
    })
}




getKey = (key, obj) => {
    return key.split('.').reduce((a, b) => {
        return a && a[b];
    }, obj);
}


// utils

getVALOR = (seletor) => {
    return document.querySelector(seletor).value
}

