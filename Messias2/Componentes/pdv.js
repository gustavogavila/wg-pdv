class Pdv extends Componente{
    constructor(){
        super({nome:'pdv',
               url:'#pdv',
                dados:{}
            })  
    }
    
  
    registrarVenda(){
        app.irPara('Venda');
    }

   view(){
    return `<div class="pdv">
     <h1>bem-vindo {Nome}</h1>

    <div class="btn-pdv" #onclick=registrarVenda()>
    <h1>Registrar Venda</h1>
    </div>


  <div class="btn-pdv">
  <h1>Verificar Pedidos</h1>
  </div>


  <div class="btn-pdv">
  <h1>Relatorios</h1>
  </div>

    </div> 
    `
}
}

app.criarComponente(Pdv);
