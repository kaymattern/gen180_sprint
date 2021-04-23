// Savings from Solar visualization

const margin = {top:80, right:50, left:120, bottom:80}; 
    
const outerHeight = 800;   // can change dimensions
const outerWidth = 1000;
    
let tucsonData = [{type: "Teacher Salary", amount: 60477, est_quantity: 711},
                  {type: "Laptops for 1,000 Students", amount: 300, est_quantity: 143},
                  {type: "Electric School Bus", amount: 230000, est_quantity: 186},
                  {type: "Books for 1,000 Students", amount: 250, est_quantity: 172},
                  {type: "School Supplies for 75 Students", amount: 52200, est_quantity: 823}]

xAxisData = [{a: 100},
            {a: 200},
            {a: 300},
            {a: 400},
            {a: 500},
            {a: 600},
            {a: 700},
            {a: 800},
            {a: 900},
            {a: 1000}]

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
console.log(quantRects)

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
   .style("fill", "#F3F1A5")

// Made the width dependent on value in est_quantity
quantRects = quantRects.attr("width", (d) => d.est_quantity);

// Add text to the viz
let quantText = innerSolar.selectAll()
   .data(tucsonData)
   .join("text")
   .text(d => d.type + ': ' + d.est_quantity)
   .attr("y", (d,i) => i*85+18)
   .attr("x", d=>0)
   .style("font-family", "Reader")
   .style("text-anchor", "left");

// Add x axis
var x = d3.scaleBand()
  .range([ 0, innerWidth ])
  .domain(xAxisData.map(function(d) { return d.a; }))
  .padding(0.2);

innerSolar.append("g")
   .attr("transform", "translate(0," + innerHeight + ")")     
   .call(d3.axisBottom(x))
   .selectAll("text")
   .attr("transform", "translate(-10,0)rotate(-45)")
   .style("text-anchor", "left");


// Trying to add bars in a diff way... 
//innerSolar.selectAll("mybar")
//   .data(tucsonData)
//   .enter()
//   .append("rect")
//     .attr("x", function(d) { return x(d.est_quantity); })
//     .attr("y", function(d) { return y(d.type); })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return innerHeight - y(d.est_quantity); })
//     .attr("fill", "#F3F1A5")
 
 