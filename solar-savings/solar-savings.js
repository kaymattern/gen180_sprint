// Savings from Solar visualization

const margin = {top:80, right:50, left:120, bottom:80}; 
    
const outerHeight = 800;   // can change dimensions
const outerWidth = 1000;
   
/*I reordered it by est_quantity manually, was trying to use d3 sort function from stack overflow but it didn't work*/
let tucsonData = [
                  {type: "School Supplies for 75 Students", amount: 52200, est_quantity: 823},
                  {type: "Teacher Salary", amount: 60477, est_quantity: 711},
                  {type: "Electric School Bus", amount: 230000, est_quantity: 186},
                  {type: "Books for 1,000 Students", amount: 250, est_quantity: 172},
                  {type: "Laptops for 1,000 Students", amount: 300, est_quantity: 143}
               ]


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
                    .style("border", "1px solid black")
                    .style("background-color","#4C6B8B")
                    ;

const innerSolar = largeSolar.append("g"); 
innerSolar.attr("transform", "translate(" +margin.left+","+margin.top+")")
; 


/* join data to innerSolar, which is placed inside the larger 
   svg according to the margins (which you can change)
*/

// Select everything in est_quantity variable and put it in innerSolar
let quantRects = innerSolar.selectAll(".est_quantity");
console.log(quantRects)

// Join tucsonData with quantrects to create rectangles
quantRects = quantRects.data(tucsonData)
   .join("rect")

var colors = ["#D9E100","#4EB1E9","#F6772D","#F3F1A5","pink"];
// Specify attributews of the rectangles
quantRects = quantRects
   .attr("class", "est_quantity")
   .attr("x", 0) 
   .attr("y", (d, i) => i*125 + 23) //Originally was i*85
   .attr("height", 60) //Originally was 40
   .attr("width", 100)
   .style("fill", function(d,i){return colors[i]})
   
// Made the width dependent on value in est_quantity
quantRects = quantRects.attr("width", (d) => d.est_quantity)

// Add text to the viz
let quantText = innerSolar.selectAll()
   .data(tucsonData)
   .join("text")
   .text(d => d.type /*+ ': ' + d.est_quantity*/)
   .attr("y", (d,i) => i*125+18)
   .attr("x", d=>0)
   .style("fill","white")
   .style("font-weight","1000")
   .style("font-family", "Reader")
   .style("text-anchor", "left");

let quantText2 = innerSolar.selectAll()
   .data(tucsonData)
   .join("text")
   .text(d =>  d.est_quantity)
   .attr("y", (d,i) => i*125 + 55)
   .attr("x", d=>d.est_quantity + 5)
   .style("fill","white")
   .style("font-weight","1000")
   .style("font-family", "Reader")
   .style("text-anchor", "right");
 
/*Tried to add icons with join
let quantIcon = innerSolar.selectAll()
.data(tusconData)
.join("image")
.attr("xlink:href", "https://cdn.onlinewebfonts.com/svg/img_409100.png")
   .attr("width", 50)
   .attr("height", 50)
   .attr("y", (d,i) => i*125 + 55)
   .attr("x", d=>d.est_quantity + 5);
*/

/*Manually edited the icons in, since 
I couldn't figure out how to join with Tuscon Data*/
var g = largeSolar.append("g");
var img = g.append("svg:image")
   .attr("xlink:href", "https://cdn.onlinewebfonts.com/svg/img_532723.png" )
   .attr("width", 50)
   .attr("height", 50)
   .attr("x", outerWidth - innerWidth-45)
   .attr("y", outerHeight- innerHeight -50);

var g2 = largeSolar.append("g");
var img2 = g2.append("svg:image")
   .attr("xlink:href", "http://cdn.onlinewebfonts.com/svg/img_353628.png")
   .attr("width", 50)
   .attr("height", 50)
   .attr("x", outerWidth - innerWidth-45)
   .attr("y", outerHeight- innerHeight + 75);

var g3 = largeSolar.append("g");
var img3 = g3.append("svg:image")
   .attr("xlink:href", "https://cdn0.iconfinder.com/data/icons/transportation-and-logistics/50/Transportation_and_Logistics-67-512.png")
   .attr("width", 50)
   .attr("height", 50)
   .attr("x", outerWidth - innerWidth-45)
   .attr("y", outerHeight- innerHeight + 200);

var g4 = largeSolar.append("g");
var img4 = g4.append("svg:image")
      .attr("xlink:href", "https://maxcdn.icons8.com/Share/icon/ios7/Files/open_book1600.png")
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", outerWidth - innerWidth-45)
      .attr("y", outerHeight- innerHeight + 325);   
var g5 = largeSolar.append("g");
var img5 = g5.append("svg:image")
      .attr("xlink:href", "https://cdn.onlinewebfonts.com/svg/img_20446.png")
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", outerWidth - innerWidth-45)
      .attr("y", outerHeight- innerHeight + 450);  

// Add x axis
var x = d3.scaleBand()
  .range([ 0, innerWidth ])
  .domain(xAxisData.map(function(d) { return d.a; }))
  .padding(0.5)
  ;

innerSolar.append("g")
   .attr("transform", "translate(0," + innerHeight + ")")     
   .call(d3.axisBottom(x))
   .selectAll("text")
   .attr("transform", "translate(-10,0)rotate(-45)")
   .style("text-anchor", "left")
   ;

/*Manually added line because I couldn't figure out how to put a y-axis with the categories*/
const yAxisLine = outerWidth-innerWidth-55
largeSolar.append("line")
            .attr("x1", yAxisLine)
            .attr("y1", innerHeight+50)
            .attr("x2", yAxisLine)
            .attr("y2", 30)
            .attr("stroke", "white")
            .attr("stroke-width","2")
;

largeSolar.append("text")
   .attr("class", "x label")
    .attr("x", innerWidth/2 + 100)
    .attr("y", outerHeight - 20) 
    .text("Y-axis label")
    .style("font-family","Reader")
    .style("fill","white")
    .style("font-weight", "1000");

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
 
 