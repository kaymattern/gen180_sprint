// Savings from Solar visualization

const margin = {top:80, right:50, left:120, bottom:80}; 
    
const outerHeight = 800;   // can change dimensions
const outerWidth = 1000;
   
/*I reordered it by est_quantity manually, was trying to use d3 sort function from stack overflow but it didn't work*/
let tucsonData = [
                  {type: "School Supplies for 75 Students", type_abv: 'SS for 75', amount: 52200, est_quantity: 823},
                  {type: "Teacher Salary", type_abv: 'Salary',  amount: 60477, est_quantity: 711},
                  {type: "Electric School Bus", type_abv: 'E-School Bus', amount: 230000, est_quantity: 186},
                  {type: "Books for 1,000 Students", type_abv: 'Books for 1,000', amount: 250, est_quantity: 172},
                  {type: "Laptops for 1,000 Students", type_abv: 'Laptops for 1,000', amount: 300, est_quantity: 143}
               ]


xAxisData = [{a: 100},
            {a: 200},
            {a: 300},
            {a: 400},
            {a: 500},
            {a: 600},
            {a: 700},
            {a: 800}]
            //{a: 900},
           // {a: 1000}]

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

var colors = ["#D9E100","#4EB1E9","#F6772D","#F3F1A5","pink"];

var x = d3.scaleLinear()
    .range([0, innerWidth])
    .domain([0, 900]);

var y = d3.scaleBand()
    .range([innerHeight, 0])
    .padding(0.1)
    .domain(tucsonData.map(function (d) {return d.type; }));

innerSolar.selectAll(".bar")
    .data(tucsonData)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("width", function(d) {return x(d.est_quantity); } )
    .attr("y", function(d) { return y(d.type); })
    .attr("height", y.bandwidth() - 20)
    .style("fill", function(d,i){return colors[i]})

innerSolar.append("g")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(d3.axisBottom(x));

innerSolar.append("g")
    .call(d3.axisLeft(y));

