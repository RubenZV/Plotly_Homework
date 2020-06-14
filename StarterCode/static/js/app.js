function getPlot(id) {
    // Extraer la info del archivo tipo JSON
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
         // Filtro por ID
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // Con slice se toman los top 10 y en reversa
        var samplevalues = samples.sample_values.slice(0, 10).reverse();

        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();

        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        // Obtiene los nombres de los top 10s
        var labels = samples.otu_labels.slice(0, 10);
  

        // Se  comienza con la grafica  y se crea el trace de las variables
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'rgb(142,124,195)'},
            type:"bar",
            orientation: "h",
        };
  

        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // se crea la gràfica de Barras
        Plotly.newPlot("bar", data, layout);
  
        //console.log(`ID: ${samples.otu_ids}`)
      
        // Trace para la gràfica de burbuja
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };

        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout_b); 
  
        // BONUS!
  
        var data_g = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Weekly Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "yellow" },
                    { range: [2, 4], color: "cyan" },
                    { range: [4, 6], color: "teal" },
                    { range: [6, 8], color: "lime" },
                    { range: [8, 9], color: "green" },
                  ]}
              
          }
        ];
        var layout_g = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", data_g, layout_g);
      });
  }  
// Funciòn para extaer datos del metadata
function getInfo(id) {
    d3.json("Data/samples.json").then((data)=> {

        var metadata = data.metadata;

        console.log(metadata)
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // Se colocabn los datos en #sample-metadata
        var demographicInfo = d3.select("#sample-metadata");
        // Limpieza de datos con html("")
        demographicInfo.html("");

        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Funciòn que se activ a con cambio de selecciòn de datos
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("Data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();