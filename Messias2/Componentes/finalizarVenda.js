class FinalizarVenda extends Componente{
    constructor(){
        super({
               nome:'FinalizarVenda',
               url:'#finalizarvenda',
               dados:{
                venda:{
                 total:0
                }
               }
              })  
    }

    view(){
        return `    
    <div class="valores">
        <h1>Total: R$ {venda.total}</h1>
        
        </div>
        `
    }

}

app.criarComponente(FinalizarVenda)