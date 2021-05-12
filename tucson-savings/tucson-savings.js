// Tucson Savings from Solar visualization

const margin = {top:50, right:50, left:50, bottom:50}; 
    
const outerHeight = 600;   // can change dimensions
const outerWidth = 800;
   
// total savings for one year: $1.1 million
let tucsonData = [{type: "Teacher Salary", amount: 45000, quantity: 24},
                  {type: "Electric School Bus", amount: 350000, quantity: 3},
                  {type: "Textbooks", amount: 100, quantity: 11000},
                  {type: "Laptops", amount: 350, quantity: 3143}
               ]


// make an inner svg to put graph in, put labels and other stuff in margins
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
    
const largeSolar = d3.select("body").append("svg")
                    .attr("id", "solar-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black");
                    //.style("background-color","#4C6B8B")

const innerSolar = largeSolar.append("g"); 
innerSolar.attr("transform", "translate(" +margin.left+","+margin.top+")")
; 


salaries = innerSolar.append("g")
buses = innerSolar.append("g")
textbooks = innerSolar.append("g")
laptops = innerSolar.append("g")
supplies = innerSolar.append("g")

var title = innerSolar.append("text")
                        .text("Tuscon Savings")
                         .style("text-anchor", "middle")
                        .attr("transform", `translate(${innerWidth/2}, ${margin.top/8})`)
                        .attr("dy", "1em")
                        .attr("class", "tucsonTitle")
                        .style("fill", "#F3F1A5")
                        .attr('font-weight', 800)
                        .attr('font-size', 32)
                        .attr('font-family', 'Verdana');

let increment = innerWidth/5;
                
salaries.attr("transform", "translate(" + 0*increment + "," + innerHeight/6 + ")");
buses.attr("transform", "translate(" + 1*increment + "," + innerHeight/6 + ")");
textbooks.attr("transform", "translate(" + 2*increment + "," + innerHeight/6 + ")");
laptops.attr("transform", "translate(" + 3*increment + "," + innerHeight/6 + ")");
supplies.attr("transform", "translate(" + 4*increment + "," + innerHeight/6 + ")");

var suppliesImg = supplies.append("svg:image")
   .attr("xlink:href", "https://cdn.onlinewebfonts.com/svg/img_532723.png" )
   .attr("width", 80)
   .attr("height", 80)
var suppliesLabel = supplies.append("text")
                            .text("School Supplies")
                            .attr("class", "tusconCatLabel")
                            .attr("y", 120)
                            .style("text-anchor", "middle")
                            .attr("x", 40)

var salImg = salaries.append("svg:image")
   .attr("xlink:href", "http://cdn.onlinewebfonts.com/svg/img_353628.png")
   .attr("width", 80)
   .attr("height", 80)

var salLabel = salaries.append("text")
                            .text("Teacher Salaries")
                            .attr("class", "tusconCatLabel")
                            .attr("y", 120)
                            .style("text-anchor", "middle")
                            .attr("x", 40)

var busImg = buses.append("svg:image")
   .attr("xlink:href", "https://cdn0.iconfinder.com/data/icons/transportation-and-logistics/50/Transportation_and_Logistics-67-512.png")
   .attr("width", 80)
   .attr("height", 80)

var busLabel = buses.append("text")
                            .text("School Buses")
                            .attr("class", "tusconCatLabel")
                            .attr("y", 120)
                            .style("text-anchor", "middle")
                            .attr("x", 40)

var booksImg = textbooks.append("svg:image")
      .attr("xlink:href", "https://maxcdn.icons8.com/Share/icon/ios7/Files/open_book1600.png")
      .attr("width", 80)
      .attr("height", 80)

var booksLabel = textbooks.append("text")
                            .text("Textbooks")
                            .attr("class", "tusconCatLabel")
                            .attr("y", 120)
                            .style("text-anchor", "middle")
                            .attr("x", 40)

var laptopImg = laptops.append("svg:image")
      .attr("xlink:href", "https://cdn.onlinewebfonts.com/svg/img_20446.png")
      .attr("width", 80)
      .attr("height", 80)

var laptopLabel = laptops.append("text")
                            .text("Laptops")
                            .attr("class", "tusconCatLabel")
                            .attr("y", 120)
                            .style("text-anchor", "middle")
                            .attr("x", 40)

suppliesImg.on("mouseover", mouseOver(24))
              .on("mouseout", mouseOut)

let tucsonText = innerSolar.append("text")
    .attr("class", "tucsonTicker")
    .attr("x", innerWidth/2 - 55)
    .attr("y", innerHeight/1.2)
    .style("font-size", "128px")
    .style("font-family", "Reader")
    .style("fill", "#4EB1E9")
    .text("0");


// on mouseover, transition from zero to amount
 function mouseOver(totalAmt) {
     console.log(d3.selectAll(".tucsonTicker"));
     d3.select(".tucsonTicker").transition().tween("text", function() {
     var selection = d3.select(this); 
     var start = 0; 
     var end = totalAmt;  
     var interpolator = d3.interpolateNumber(start,end); 
     return function(t) { selection.text(Math.round(interpolator(t))); };  // return value     
  })
  .duration(5000);  
    }

    function mouseOut() {
        
    }


