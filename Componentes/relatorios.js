class Relatorios extends Componente{
    constructor(){
        super({nome:'Relatorios',
               url:'#relatorios',
                dados:{}
            })  
    }
    
  inicializar(){
     app.verificarSession()
   }
  gerarRelatorio(){
    const inicio = VALOR('#inicio');
    const fim = VALOR('#fim');
    console.log(inicio,fim)
    const ctx = document.getElementById("linha").getContext('2d');
   buscar_pedidos(inicio,fim).then(({pedidos})=>{
     if(pedidos){
    let labels =  pedidos.map(pedido=> pedido.data)
    let valores =  pedidos.map(pedido=> pedido.valor)
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{ 
          label: "Total(R$)",
            data: valores,
            borderColor: "#3e95cd",
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Valor vendido total por data'
        }
        
      }
    });
  }else{
    toggleModal("Pedido", `
    <h5>Nenhum pedido encontrado nesse período.</h5>
    <button class="btn" onclick="fecharModal();">Entendido!</button>
    `)
  }
   })


    
	
  }


  pdv(){
      app.irPara('pdv')
  }


   view(){
    return `
    <div class="pdv">
    <div class="col">
 Periodo:<input type='date' id='inicio'/> Até <input type='date' id='fim' /> <button  #onClick=gerarRelatorio() class="btn"> Buscar<button/>
    
</div>
<div class="col">
<canvas id="linha"></canvas>
    </div>
    </div>
    `
}
}

app.criarComponente(Relatorios);
