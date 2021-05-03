// Solar Spending Visualization
// School districts in the US spend $6 billion on energy/year
// Approx. 13,551 school districts in US -> $442,772 spent per school district on energy/year
// Visualize this spending as savings if you switch to solar/what you can get with this money

const margin = {top:80, right:50, left:120, bottom:80}; 
    
const outerHeight = 800;   // can change dimensions
const outerWidth = 1000;
   
/*I reordered it by est_quantity manually, was trying to use d3 sort function from stack overflow but it didn't work*/
let spendingData = [
                  {type: "School Supplies for 100 Students", type_abv: 'SS for 100', amount: 52200, est_quantity: 6},
                  {type: "Teacher Salary", type_abv: 'Salary',  amount: 60477, est_quantity: 7},
                  {type: "Electric School Bus", type_abv: 'E-School Bus', amount: 230000, est_quantity: 1},
                  {type: "Books for 100 Students", type_abv: 'Books for 100', amount: 250, est_quantity: 17},
                  {type: "Laptops for 100 Students", type_abv: 'Laptops for 100', amount: 300, est_quantity: 14}
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

var colors = ["#D9E100","#4EB1E9","#F6772D","#F3F1A5","pink"];

// Creating Bar chart with axes
var x = d3.scaleLinear()
    .range([0, innerWidth])
    .domain([0, 20]);

var y = d3.scaleBand()
    .range([innerHeight, 0])
    .padding(0.1)
    .domain(spendingData.map(function (d) {return d.type; }));

innerSolar.selectAll(".bar")
    .data(spendingData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", 0)
    .attr("y", function(d) { return y(d.type); })
    .attr("height", y.bandwidth() - 20)
    .style("fill", function(d,i){return colors[i]});

innerSolar.append("g")
    .attr("transform", "translate(0," + innerHeight + ")")
    .style("font-size", "12px")
    .call(d3.axisBottom(x).tickSize(20));

innerSolar.append("g")
    .call(d3.axisLeft(y).tickValues(['', '', '', '', '']));

// Add Icons
var g = innerSolar.append("g");
var img = g.append("svg:image")
   .attr("xlink:href", "https://cdn.onlinewebfonts.com/svg/img_20446.png" )
   .attr("width", 50)
   .attr("height", 50)
   .attr("x", outerWidth - innerWidth-240)
   .attr("y", outerHeight- innerHeight - 128);

var g2 = innerSolar.append("g");
var img2 = g2.append("svg:image")
   .attr("xlink:href", "https://maxcdn.icons8.com/Share/icon/ios7/Files/open_book1600.png")
   .attr("width", 50)
   .attr("height", 50)
   .attr("x", outerWidth - innerWidth-239)
   .attr("y", outerHeight- innerHeight - 3);

var g3 = innerSolar.append("g");
var img3 = g3.append("svg:image")
   .attr("xlink:href", "https://cdn0.iconfinder.com/data/icons/transportation-and-logistics/50/Transportation_and_Logistics-67-512.png")
   .attr("width", 50)
   .attr("height", 50)
   .attr("x", outerWidth - innerWidth-240)
   .attr("y", outerHeight- innerHeight + 125);

var g4 = innerSolar.append("g");
var img4 = g4.append("svg:image")
      .attr("xlink:href", "http://cdn.onlinewebfonts.com/svg/img_353628.png")
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", outerWidth - innerWidth-240)
      .attr("y", outerHeight- innerHeight + 245);  

var g5 = innerSolar.append("g");
var img5 = g5.append("svg:image")
      .attr("xlink:href", "https://cdn.onlinewebfonts.com/svg/img_532723.png")
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", outerWidth - innerWidth-240)
      .attr("y", outerHeight- innerHeight + 372);  

// Bar Animation
innerSolar.selectAll(".bar")
    .transition()
    .duration(2000)
    .attr("width", function(d) { return x(d.est_quantity); });

// Mouse Interactivity
innerSolar.selectAll(".bar").on("mouseover", function() {
    d3.select(this).style("opacity", 1)
    const thisData = d3.select(this).data()[0]
    spendingTypeSpan.text(thisData.type)
    spendingQuantSpan.text(thisData.est_quantity)
    tooltip.style("opacity", 1)

    }).on("mouseout", function() {
        tooltip.style("opacity", 0)
    }).on("mousemove", function(event) {
        tooltip.style("left", d3.pointer(event)[0] + "px")
        tooltip.style("top", d3.pointer(event)[1] + "px")
    })

    const tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("border", "1px solid black")
        .style("padding", "10px")
        .style("position", "absolute")
        .style("opacity", 0)
        .style("background-color", "white")
        .style("pointer-events", "none")
        .style("font-family", "Reader")
        .style("font-size", "18px")

    let spendingType = tooltip.append("div")
    let spendingTypeSpan = spendingType.append("span")

    let spendingQuantity = tooltip.append("div").text("Quantity: ")
    let spendingQuantSpan = spendingQuantity.append("span")
;