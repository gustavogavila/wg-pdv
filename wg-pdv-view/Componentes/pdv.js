class Pdv extends Componente{
    constructor(){
        super({nome:'pdv',
               url:'#pdv',
                dados:{}
            })  
    }
    
  inicializar(){
    if(app.verificarSession()){
        this.dados =  {Nome:app.verificarSession().Nome}
    }

   }
    registrarVenda(){
        app.irPara('Venda');
    }
    Pedidos(){
        app.irPara('Pedidos');
    }
    Relatorios(){
        app.irPara('Relatorios');
    }
   view(){
    return `<div>
     <h1>Bem-vindo {Nome}</h1>
  <hr/>
    <div class="btn-pdv" #onclick=registrarVenda()>
    <h1>Registrar Venda</h1>
    </div>


  <div class="btn-pdv" #onclick=Pedidos()>
  <h1>Verificar Pedidos</h1>
  </div>


  <div class="btn-pdv" #onclick=Relatorios()>
  <h1>Relatorios</h1>
  </div>

    </div> 
    `
}
}

app.criarComponente(Pdv);
