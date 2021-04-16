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

