let loadFile = function(event) {

    document.getElementById('imgtemplate').style.display = "block";
    // set the dimensions and margins of the graph
    let margin = {top: 2, right: 2, bottom: 0, left: 0};
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#div_template")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")

     if (event.files && event.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image;
          img.onload = function() { 

            let imggedetails = d3.select("#imgtemplate")

            imggedetails.append('text')
            .attr('width', 600)
            .attr('height', 40)
            .attr('stroke', 'black')
            .attr('fill', '#fff')            
            .html("Image Name: "+event.files[0].name+" <br/> Dimensions:  --- "+img.width+" X "+img.height+" <br/> MIME TYPE: "+event.files[0].type)
            
            document.getElementById('ciclecor').value = img.width;
          };

          img.src = reader.result;

        };
        reader.readAsDataURL(event.files[0]);
      }


    let image = URL.createObjectURL(event.files[0]);

    svg.append('image')
    .attr('id', "imagid")
    .attr('xlink:href', image)
    .attr("width", width)
    .attr("height", height)

        
    svg.on("click", function() {

        d3.select("#main_div")
        .style("position", "absolute")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px") 

        document.getElementById('main_div').style.display = "block";
        let coords = d3.mouse(this);                   
        document.getElementById('ciclecor').value = coords;
    })
    
}

function savepopup() {
    let modal = document.getElementById("main_div");
    let desc = d3.select("#input_val").property("value");
    let coords = d3.select("#ciclecor").property("value");
    drawcicrle(desc, coords);
    document.getElementById('input_val').value = '';  
    modal.style.display = "none";
} 

function closepopup() { 
    let modal = document.getElementById("main_div");
    modal.style.display = "none";
}

function drawcicrle(popval , coords){

    let coordaxis = coords.split(",");    
    let dataset = []
    let newData= {
        x: coordaxis[0],  
        y: coordaxis[1],
        desc: popval
      };
    dataset.push(newData); 

    let svg = d3.select("svg");       
    // create a tooltip
    let Tooltip = d3.select("#div_template")
     .append("div")
     .style("opacity", 0)
     .attr("class", "tooltip")
    
     // Append a circle
     let circles = svg.selectAll()
     .data(dataset)
     .enter()
     .append('circle')            
     .attr('cx', d => d.x)
     .attr('cy', d => d.y)
     .attr("r", 8)
     .attr("fill", "#800020");     

     circles.on("mouseover", function(d) {
         Tooltip.style("opacity", 0.7)
            .html(d.desc)
            .style("left", (d3.event.pageX-25) + "px")
            .style("top", (d3.event.pageY-35) + "px")
            .style("background", "red")
            .style("background", "white")
         })
         .on("mouseout", function(d) {
             Tooltip.style("opacity", 0)
         })

    drawtable(dataset);
}

function drawtable(tabledata) {

    document.getElementById('table').style.display = "block";
    let columns = ['x', 'y', 'desc'];
    let table1 = d3.select('#table')

    let tbody = table1.select('tbody');

        // create a row for each object in the data
        let rows = tbody.selectAll()
        .data(tabledata)
        .enter()
        .append('tr');  

        //create a cell in each row for each column
        let cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {
            return {
                value: row[column]                
            };
            });
        })
        .enter()
        .append('td')
        .html(function(d) {
            return d.value;
        })
        .style("background-color", "#e6e6e6")
        .style("color", "#000000");
}
