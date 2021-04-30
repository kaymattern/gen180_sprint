// How to Pay for Solar visualization

const margin = {top:40, right:40, left:80, bottom:40};
    
const outerHeight = 600;   // can change dimensions
const outerWidth = 600;
    
// make an inner svg to put graph in, put labels and other stuff in margins
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
    
const largePay = d3.select("#vis").append("svg")
                    .attr("id", "pay-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black");

const innerPay = largePay.append("g"); 

/* join data to innerSolar, which is placed inside the larger 
   svg according to the margins (which you can change)
*/

let payData = [{finType: 'Direct Ownership - Bonds/Loan/Cash/Other', amount: 14, color: "#d3d3d3"},
               {finType: 'Direct Ownership - Grants and Donations', amount: 7, color: "#f3f1a5"},
               {finType: 'Third-Party Ownership', amount: 79, color: "#4c6b8b"}
               ]



const pieWidth = 300
const pieHeight = 300

arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(pieWidth, pieHeight) / 2 - 1)

pie = d3.pie()
    .sort(null)
    .value(d => d.amount)


const payArcs = pie(payData)

const radius = Math.min(pieWidth, pieHeight) / 2 * 0.8;

innerPay.attr("transform", "translate(" +(margin.left + radius)+","+(margin.top + radius) + ")"); 

console.log(radius)

const howPayPie = innerPay.append('g').attr("stroke", "white")
                        .selectAll("path")
                            .data(payArcs)
                            .join("path")
                            .attr("fill", d => d.data.color)
                            .attr("d", arc)
                            .append("title").text(d=> `${d.data.finType}: ${d.data.amount.toLocaleString()}`);



 innerPay.append("g")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(payArcs)
    .join("text")
      .attr("transform", d => `translate(${d3.arc().innerRadius(radius).outerRadius(radius).centroid(d)})`)
      .call(text => text.append("tspan")
          .attr("font-weight", "bold")
            .attr("y", "-.8em")
          .text(d => d.data.finType))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 5)
          .attr("y", ".4em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.amount.toLocaleString() + " %"));

innerPay.attr("transform", "translate("+ radius*2+ ","+ radius*2 +")")
