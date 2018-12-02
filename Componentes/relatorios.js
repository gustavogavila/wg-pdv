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
  depoisDeInicializar(){
    var ctx = document.getElementById("linha").getContext('2d');
        var line = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['18/11/2018','19/11/2018','20/11/2018'],
              datasets: [{ 
                label: "Pedidos",
                  data: [1,6,26],
                  borderColor: "#3e95cd",
                  fill: false
                },
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Total de pedidos do periodo'
              }
              
            }
          });
	
  }


  pdv(){
      app.irPara('pdv')
  }


   view(){
    return `
    <div class="pdv">
    <div class="col">
 Periodo:<input type='date'/> Até <input type='date'/> <button  class="btn"> Buscar<button/>
    
</div>
<div class="col">
<canvas id="linha"></canvas>
    </div>
    </div>
    `
}
}

app.criarComponente(Relatorios);
