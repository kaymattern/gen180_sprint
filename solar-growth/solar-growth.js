// Savings from Solar visualization

const margin = {top:80, right:50, left:50, bottom:100}; 
    
const outerHeight = 500;   // can change dimensions
const outerWidth = 400;
   

let capGrowth = [{year: 2014, cap: 560, op: "#efce8a"}, 
                 {year: 2015, cap: 664, op: "#efce8a"}, 
                 {year: 2016, cap: 798, op: "#eac169"}, 
                 {year: 2017, cap: 983, op: "#e4b444"}, 
                 {year: 2018, cap: 1160, op: "#e4b444"}, 
                 {year: 2019, cap: 1337, op: "#daaa33"} ]

let schoolsGrowth = [{year: 2014, schools: 4061, op: "#8fb4cb"}, 
                 {year: 2015, schools: 4546, op: "#6b99b6"}, 
                 {year: 2016, schools: 5112, op: "#4380a1"}, 
                 {year: 2017, schools: 5972, op: "#0f6a8e"}, 
                 {year: 2018, schools: 6721, op: "#004e73"}, 
                 {year: 2019, schools: 7332, op: "#004e73"}]

capGrowth.sort(function(x, y) {
    return d3.ascending(x.cap, y.cap)
})

schoolsGrowth.sort(function(x, y) {
    return d3.ascending(x.schools, y.schools)
})
               

// make an inner svg to put graph in, put labels and other stuff in margins
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
    
const largeGrowth1 = d3.select("body").append("svg")
                    .attr("id", "solar-growth-main1")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black")
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    ;


const innerGrowth1 = largeGrowth1.append("g"); 
innerGrowth1.attr("transform", "translate(" +margin.left+","+margin.top+")"); 


const largeGrowth2 = d3.select("body").append("svg")
                    .attr("id", "solar-growth-main2")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black")
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    ;


const innerGrowth2 = largeGrowth2.append("g"); 
innerGrowth2.attr("transform", "translate(" +margin.left+","+margin.top+")"); 

var yearsLeg = d3.scaleBand()
                .range([0, innerWidth])
                .domain(schoolsGrowth.map(d => d.year))
                .padding(.2)


const caprScale = d3.scaleLinear()
                .domain([0, 1337])
                .range([300, 0]); 

const schoolrScale = d3.scaleLinear()
                .domain([0, 7332])
                .range([300, 0]); 
    
const capLeg = innerGrowth1.append("g")
            .attr("transform", "translate(0,"+ innerHeight+")")
            .call(d3.axisBottom(yearsLeg))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

const capRects = innerGrowth1.selectAll(".cap-rect")
            .data(capGrowth)
            .join("rect")
            .attr("class", "cap-rect")
            .attr("fill", d=> d.op)
            .attr("width", yearsLeg.bandwidth())
            .attr("height", d=> innerHeight - caprScale(d.cap))
            .attr("x", d=> yearsLeg(d.year))
            .attr("y", d=> caprScale(d.cap))
            .style("fill-opacity", 1)
            .style("opacity", 1)
            .style("border", "1px solid black")
            .attr("stroke", "black"); 

const capBLabel = innerGrowth1.selectAll("capBLabel")
                    .data(capGrowth)
                    .join("text")
                    .attr("class", "capBLabel")
                    .attr("x", d=>yearsLeg(d.year))
                    .attr("y", d=>caprScale(d.cap) - 10)
                    .text(d=> d.cap); 

capRects.style("opacity", 0)
    .transition().delay(function(d, i) {return i * 800})
    .style("opacity", 1)

capBLabel.style("opacity", 0)
    .transition().delay(function(d, i) {return i * 800})
    .style("opacity", 1)

const schoolLeg = innerGrowth2.append("g")
            .attr("transform", "translate(0,"+ innerHeight+")")
            .call(d3.axisBottom(yearsLeg))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

const schoolBLabel = innerGrowth2.selectAll("schoolBLabel")
                    .data(schoolsGrowth)
                    .join("text")
                    .attr("class", "schoolBLabel")
                    .attr("x", d=>yearsLeg(d.year))
                    .attr("y", d=>schoolrScale(d.schools) - 10)
                    .text(d=> d.schools); 
    
const schoolRects = innerGrowth2.selectAll(".school-rect")
            .data(schoolsGrowth)
            .join("rect")
            .attr("class", "school-rect")
            .attr("fill", d=> d.op)
            .attr("width", yearsLeg.bandwidth())
            .attr("height", d=> innerHeight - schoolrScale(d.schools))
            .attr("x", d=> yearsLeg(d.year))
            .attr("y", d=> schoolrScale(d.schools))
            .style("fill-opacity", 1)
            .style("opacity", 1)
            .style("border", "1px solid black")
            .attr("stroke", "black"); 


schoolRects.style("opacity", 0)
    .transition().delay(function(d, i) {return i * 800})
    .style("opacity", 1)


schoolBLabel.style("opacity", 0)
    .transition().delay(function(d, i) {return i * 800})
    .style("opacity", 1)

/*
var gCap = innerGrowth.append("g");
var img = gCap.append("svg:image")
   .attr("xlink:href", "http://cdn.onlinewebfonts.com/svg/img_89754.png" )
   .attr("width", 50)
   .attr("height", 50)
    .attr("x", innerWidth/4 - 75)
    .attr("y", innerHeight + margin.bottom/2);

var gSchools = innerGrowth.append("g");
var img2 = gSchools.append("svg:image")
   .attr("xlink:href", "http://cdn.onlinewebfonts.com/svg/img_390552.png")
   .attr("width", 50)
   .attr("height", 50)
    .attr("x", 3*(innerWidth/4) - 75)
    .attr("y", innerHeight + margin.bottom/4);
    */
