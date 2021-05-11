// Tucson Savings from Solar visualization

const margin = {top:80, right:50, left:120, bottom:80}; 
    
const outerHeight = 800;   // can change dimensions
const outerWidth = 1000;
   
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

var text = innerSolar.append("text")
    .data(tucsonData)
    .attr("x", 310)
    .attr("y", 500)
    .style("font-size", "128px")
    .style("font-family", "Reader")
    .style("fill", "#4EB1E9")
    .text( function(d) {return d.quantity; } );

text.transition()
  .tween("text", function() {
     var selection = d3.select(this); 
     var start = 1; 
     var end = d3.select(this).text();                    
     var interpolator = d3.interpolateNumber(start,end); 
     return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
     
  })
  .duration(5000);
