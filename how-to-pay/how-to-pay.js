// How to Pay for Solar visualization

const margin = {top:80, right:50, left:120, bottom:80};
    
const outerHeight = 800;   // can change dimensions
const outerWidth = 1000;
    
// make an inner svg to put graph in, put labels and other stuff in margins
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
    
const largePay = d3.select("body").append("svg")
                    .attr("id", "pay-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black");

const innerPay = largePay.append("g"); 
innerPay.attr("transform", "translate(" +margin.left+","+margin.top+")"); 

/* join data to innerSolar, which is placed inside the larger 
   svg according to the margins (which you can change)
*/

let payData = [{finType: 'Third-Party Ownership', amount: 79},
               {finType: 'Direct Ownership - Grants and Donations', amount: 7},
               {finTYpe: 'Direct Ownership - Bonds/Loan/Cash/Other', amount: 14}]

var radius = Math.min(innerHeight, innerWidth) / 2 - 40

var color = d3.scaleOrdinal()
    .domain(payData)
    .range(["#4c6b8b", "#f3f1a5", "#d3d3d3"]);

var pie = d3.pie()
    .value(function(d) {return d.amount; });

var arc = innerPay.selectAll("arc")
                 .data(pie(payData))  
                 .enter();

      var path = d3.arc()
                   .outerRadius(radius)
                   .innerRadius(0);
      arc.append("path")
         .atrr("d", path)
         .attr("fill", function(d) { return color(d.payData.amount); });

