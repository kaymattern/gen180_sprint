// Savings from Solar visualization

const margin = {top:80, right:50, left:50, bottom:100}; 
    
const outerHeight = 600;   // can change dimensions
const outerWidth = 800;

let sizesData = [{
                 "title": "0-4.99 kW",
                'Direct Ownership - Grants and Donations': 98, 
                 "Direct Ownership - Bonds/Loan/Cash/Other": 0, 
                 'Third-Party Ownership': 2,
                 'total': 100
                 }, 
               {
                 "title": "5-14.99 kW",
                    'Direct Ownership - Grants and Donations': 81, 
                 "Direct Ownership - Bonds/Loan/Cash/Other": 1, 
                 'Third-Party Ownership': 17, 
                 'total': 100
                 }, 
                {
                 "title": "15-49.00 kW",
                 'Direct Ownership - Grants and Donations': 38, 
                 "Direct Ownership - Bonds/Loan/Cash/Other": 5, 
                 'Third-Party Ownership': 57, 
                 'total': 100
                 }, 
               {
                 "title": "50-199.99 kW",
                    'Direct Ownership - Grants and Donations': 12, 
                 "Direct Ownership - Bonds/Loan/Cash/Other": 14, 
                 'Third-Party Ownership': 74, 
                 'total': 100
                 }, 
               {
                 "title": "200-399.99 kW",
                   'Direct Ownership - Grants and Donations': 9, 
                 "Direct Ownership - Bonds/Loan/Cash/Other": 13, 
                 'Third-Party Ownership': 78, 
                 'total': 100
                 }, 
                {
                "title":"400+ kW",
                      'Direct Ownership - Grants and Donations': 17, 
                 "Direct Ownership - Bonds/Loan/Cash/Other": 3, 
                 'Third-Party Ownership': 80, 
                 'total': 100
                 }, ["title", 'Direct Ownership - Grants and Donations', 
                     "Direct Ownership - Bonds/Loan/Cash/Other",'Third-Party Ownership'
                 ]]; 

let categories =  ['Third-Party Ownership', 'Direct Ownership - Grants and Donations', 
                     "Direct Ownership - Bonds/Loan/Cash/Other"
                 ]

// make an inner svg to put graph in, put labels and other stuff in margins
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
    
const largeFundSize = d3.select("body").append("svg")
                    .attr("id", "fund-size-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black")
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    ;


const innerFundSize = largeFundSize.append("g"); 
innerFundSize.attr("transform", "translate(" +margin.left+","+margin.top+")"); 


series = d3.stack()
    .keys(sizesData[6].slice(1))
  (sizesData)
    .map(d => (d.forEach(v => v.key = d.key), d))

console.log(series); 

x = d3.scaleBand()
    .domain(sizesData.map(d => d.title))
    .range([margin.left, innerWidth - margin.right])
    .padding(0.1)

y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([innerHeight - margin.bottom, margin.top])

const fundSizeColors = (type) => {
    if (type ===  "Direct Ownership - Bonds/Loan/Cash/Other") {
        return "f6772d"; 
        }
    if (type ===  'Direct Ownership - Grants and Donations') {
        return "#f3f1a5"; 
    }
    if (type === 'Third-Party Ownership') {
        return  "#4c6b8b"; 
    }
}

xAxis = g => g
    .attr("transform", `translate(0,${innerHeight - margin.bottom})`)
    .style("font-family", "Verdana")
    .call(d3.axisBottom(x).tickSize(0))
    .call(g => g.selectAll(".domain").remove())

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .style("font-family", "Verdana")
    .call(d3.axisLeft(y).ticks(null, "s").tickSize(0))
    .call(g => g.selectAll(".domain").remove())

formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

innerFundSize.selectAll("fundGroups")
                .data(series)
                .join("g")
                .attr("fill", d=> fundSizeColors(d.key))
                .selectAll("fundSizeRect")
                .data(d => d) 
                .join("rect")
                    .attr("x", (d, i) => x(d.data.title))
                    .attr("y", d=>y(d[1]))
                    .attr("height", d => y(d[0]) - y(d[1]))
                    .attr("width", x.bandwidth())
                    .style("border", "1px solid white")
                    .attr("stroke", "white")
                    .attr("stroke-width", 0)
                .append("title")
                    .text(d=> `${d.data.title} ${d.key}${formatValue(d.data[d.key])}`);

innerFundSize.append("g")
      .call(xAxis);

innerFundSize.append("g")
      .call(yAxis);


const innerFundLeg = innerFundSize.append("g");


innerFundSize.append("text")
                .attr("id", "fundSizeTitle")
                .attr("text-anchor", "middle")
                .attr("transform", `translate(${innerWidth/2 - 25},10)`)
                .text("School System Size Distribution by Financing Type")
                .style("fill", "4C6B8B")
                .style("font-family", "Verdana")
                .style("stroke", "4C6B8B")
                .style("font-size", "18px")

innerFundLeg.selectAll(".innerFundLegRect")
                    .data(categories)
                        .join("rect")
                        .attr("width", 160)
                        .attr("height", 40)
                        .attr("class", "innerFundLegRect")
                        .attr("x", (d, i)=> i*180 + 35)
                        .style("fill", d=> fundSizeColors(d))
                        .style("border", "1px solid black")
                        .attr("stroke", "white")
                        .attr("stroke-width", 1);
let categoriesPrim =  ['Third-Party Ownership', 'Direct Ownership - ', 
                     "Direct Ownership - "
                 ]
let categoriesSub =  ['', 'Grants and Donations', 
                     "Bonds/Loan/Cash/Other"
                 ]

innerFundLeg.selectAll(".innerFundLegLabel")
                        .data(categoriesPrim)
                        .attr("class", "innerFundLegLabel")
                        .join("text")
                        .text(d=> d)
                        .attr("x", (d, i)=> i*180 + 45)
                        .attr("y", 15)
                        .style('fill', 'white')
                        .attr("stroke", "white")
                        .style("font-size", "12px")
                        .style("font-family", "Verdana"); 

innerFundLeg.selectAll(".innerFundLegLabelSub")
                        .data(categoriesSub)
                        .attr("class", "innerFundLegLabelSub")
                        .join("text")
                        .text(d=> d)
                        .attr("x", (d, i)=> i*180 + 45)
                        .attr("y", 30)
                        .style('fill', 'white')
                        .attr("stroke", "white")
                        .style("font-size", "10px")
                        .style("font-family", "Verdana"); 

innerFundLeg.attr("transform", "translate(" +(innerWidth/2 - 3*(180+40)/2)+","+(innerHeight-15)+")"); 




