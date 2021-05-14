// make draw functions for all the visualizations 

// function to resize on window size change
function responsivefy(svg) {
  const container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width'), 10),
      height = parseInt(svg.style('height'), 10),
      aspect = width / height;
 
  svg.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);
 
  d3.select(window).on(
      'resize.' + container.attr('id'), 
      resize
  );
    
  function resize() {
      const w = parseInt(container.style('width'));
      svg.attr('width', w);
      svg.attr('height', Math.round(w / aspect));
  }
}

// bar chart: funding type by project size 
function drawFundBar() {
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

    const margin = {top:50, right:50, left:50, bottom:60}; 
    const outerHeight = 300;  
    const outerWidth = 400;
    
    let categories =  ['Third-Party Ownership', 'Direct Ownership - Grants and Donations', 
                     "Direct Ownership - Bonds/Loan/Cash/Other"
                 ]
    const innerHeight = outerHeight - margin.top - margin.bottom; 
    const innerWidth = outerWidth - margin.left - margin.right;   
    
    const largeFundSize = d3.select("div#fundSizeViz").append("svg")
                    .attr("id", "fund-size-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .call(responsivefy);
    const innerFundSize = largeFundSize.append("g"); 
    innerFundSize.attr("transform", "translate(" +margin.left+","+margin.top+")"); 


    series = d3.stack()
        .keys(sizesData[6].slice(1))
    (sizesData)
        .map(d => (d.forEach(v => v.key = d.key), d))

    x = d3.scaleBand()
        .domain(sizesData.map(d => d.title))
        .range([margin.left, innerWidth - margin.right])
        .padding(0.1)

    y = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .rangeRound([innerHeight - margin.bottom, margin.top])

    const fundSizeColors = (type) => {
        if (type ===  "Direct Ownership - Bonds/Loan/Cash/Other") {
            return "#f6772d"; 
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
        .style("font-size", "3px")
        .attr("stroke-width", 0)
        .call(d3.axisBottom(x).tickSize(0))
        .call(g => g.selectAll(".domain").remove())

    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .style("font-family", "Verdana")
        .style("font-size", "6px")
        .attr("stroke-width", 0)
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
                .attr("transform", `translate(${innerWidth/2 -10},25)`)
                .text("School System Size Distribution by Financing Type")
                .style("fill", "#4C6B8B")
                .style("font-family", "Verdana")
                .style("stroke", "#4C6B8B")
                .style("font-size", "12px")

    innerFundLeg.selectAll(".innerFundLegRect")
                    .data(categories)
                        .join("rect")
                        .attr("width", innerWidth/3)
                        .attr("height", innerHeight/7)
                        .attr("class", "innerFundLegRect")
                        .attr("x", (d, i)=> i*105 + 40)
                        .style("fill", d=> fundSizeColors(d))
                        .style("border", "1px solid black")
                        .attr("stroke", "white")
                        .attr("stroke-width", 1);
    let categoriesPrim =  ['Third-Party Ownership', 'Direct Ownership ', 
                     "Direct Ownership"
                 ]
    let categoriesSub =  ['', 'Grants and Donations', 
                     "Bonds/Loan/Cash/Other"
                 ]
    function legFill(word, num) {
        console.log(word, num);
        if (word === "Direct Ownership " && num === 1) {
            console.log("entered"); 
            return "black";
        } 
        if (word === "Grants and Donations" && num === 1) {
            return "black"; 
            }
        else {
            return "white";
        }
    }

    innerFundLeg.selectAll(".innerFundLegLabel")
                        .data(categoriesPrim)
                        .attr("class", "innerFundLegLabel")
                        .join("text")
                        .text(d=> d)
                        .attr("x", (d, i)=> i*105 + 43)
                        .attr("y", 10)
                        .style('fill', (d,i)=> legFill(d, i))
                        .attr("stroke-width", 0)
                        .style("font-size", "6px")
                        .style("font-family", "Verdana"); 

    innerFundLeg.selectAll(".innerFundLegLabelSub")
                        .data(categoriesSub)
                        .attr("class", "innerFundLegLabelSub")
                        .join("text")
                        .text(d=> d)
                        .attr("x", (d, i)=> i*105 + 43)
                        .attr("y", 17)
                        .style('fill', (d,i)=> legFill(d, i))
                        .attr("stroke-width", 0)
                        .style("font-size", "5px")
                        .style("font-family", "Verdana"); 

    innerFundLeg.attr("transform", "translate(" +(innerWidth/2 - 3*(105+40)/2)+","+(innerHeight-40)+")"); 

};

drawFundBar();