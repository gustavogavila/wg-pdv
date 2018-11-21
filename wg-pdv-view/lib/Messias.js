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
        this.componenteAtual.depoisDeInicializar()
    }
    irPara(nome, dados = null) {
        let comp = Componentes[nome]
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
    static salvarSession(valor){
        sessionStorage.setItem('session',JSON.stringify(valor))
    }
    verificarSession(componente=null){
        let session = JSON.parse(sessionStorage.getItem('session'))
        if(session)
        return session
        
        if(componente)
        this.irPara(componente)
        else return false;
    }
    limparSession(){
        sessionStorage.removeItem('session')
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
    depoisDeInicializar(){}
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

VALOR = (seletor) => {
    if(document.querySelector(seletor))
    return document.querySelector(seletor).value
    else return null
}
GET = (seletor) =>document.querySelector(seletor)

onTecla=(codigo,callback)=>{
    document.addEventListener('keypress', (event) => {
        console.log(event.key,event.keyCode)
        if(event.keyCode == codigo){
            callback();
        }
      });
}


stringParaHtml = (str)=>{
    let html = document.createElement('template');
    html.innerHTML = str;
    return html.content.firstElementChild
}

toggleModal =(titulo,conteudo,height = null)=> {
    var modal = document.querySelector('.modal');
    var _conteudo = document.querySelector('.conteudo');
    var _titulo = document.querySelector('.modal-titulo');
    _titulo.textContent = titulo;
    _conteudo.innerHTML = conteudo
    modal.classList.toggle('show-modal');
}
fecharModal=()=>{
    var modal = document.querySelector('.modal');
    modal.classList.toggle('show-modal');
}

(setarModal=()=>{
    let html = ` 
    <div class="modal">
    <div class="modal-conteudo">
        
        <h1><span class='modal-titulo'>!<span></h1>
        <div class="conteudo">
        
        </div>
    </div>
    </div>`
    let css = `
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    }
    .modal-conteudo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem 1.5rem;
        width: 24rem;
        border-radius: 0.5rem;
    }
    .btn-fechar {
        float: right;
        width: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        cursor: pointer;
        border-radius: 0.25rem;
        background-color: lightgray;
    }
    .btn-fechar:hover {
        background-color: darkgray;
    }
    .show-modal {
        opacity: 1;
        visibility: visible;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }
     `
    let style = document.createElement('style');
    style.innerHTML = css;
     document.head.appendChild(style)
     document.body.appendChild(stringParaHtml(html))

     var closeButton = document.querySelector('.btn-fechar');
     closeButton.addEventListener("click", toggleModal);
})()


