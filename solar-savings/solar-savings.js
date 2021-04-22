// Savings from Solar visualization

const margin = {top:80, right:50, left:120, bottom:80}; 
    
const outerHeight = 800;   // can change dimensions
const outerWidth = 1000;
    
let tucsonData = [{type: "Teacher Salary", amount: 60477, est_quantity: 711},
                  {type: "Laptop", amount: 300, est_quantity: 143333},
                  {type: "Electric School Bus", amount: 230000, est_quantity: 186},
                  {type: "Books for One Student", amount: 250, est_quantity: 172000},
                  {type: "School Supplies for 50 Students", amount: 34800, est_quantity: 1235}]

// tucsonData.map((d) => {
//   d.amount = +d.amount;
//   d.est_quantity = +d.est_quantity;
//});

// make an inner svg to put graph in, put labels and other stuff in margins
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
    
const largeSolar = d3.select("body").append("svg")
                    .attr("id", "solar-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black");

const innerSolar = largeSolar.append("g"); 
innerSolar.attr("transform", "translate(" +margin.left+","+margin.top+")"); 

/* join data to innerSolar, which is placed inside the larger 
   svg according to the margins (which you can change)
*/

// Select everything in est_quantity variable and put it in innerSolar
let quantRects = innerSolar.selectAll(".est_quantity");

// Join tucsonData with quantrects to create rectangles
quantRects = quantRects.data(tucsonData)
   .join("rect")

// Specify attributews of the rectangles
quantRects = quantRects
   .attr("class", "est_quantity")
   .attr("x", 0) 
   .attr("y", (d, i) => i*85 + 23) 
   .attr("height", 40)
   .attr("width", 100)
   .style("fill", "blue")

// Made the width dependent on value in est_quantity
quantRects = quantRects.attr("width", (d) => d.est_quantity);

// Add text to the viz
let quantText = innerSolar.selectAll()
   .data(tucsonData)
   .join("text")
   .text(d => d.type + ':' + d.est_quantity)
   .attr("y", (d,i) => i*85+18)
   .attr("x", d=>0)
   .style("font-family", "Reader")
   .style("text-anchor", "left");