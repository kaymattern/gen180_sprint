// Map visualization

// state data array
/* 

3rd party policies: https://ncsolarcen-prod.s3.amazonaws.com/wp-content/uploads/2019/07/DSIRE_3rd-Party-PPA_June_2019.pdf

Number of solar schools: https://www.thesolarfoundation.org/solar-schools/ 
*/

// global variables 
// let SCALES 
// let LEGEND 

let statePaths, dataset, largeMap, innerMap, pathGenerator, legend;

let legendLawLabel1, legendLawLabel2, legendLawLabel3, legendCapLabel; 

let legendLawCapLabel1, legendLawCapLabel2, legendLawCapLabel3;

let thirdPartyTitle, capTitle, solarSchoolsTitle; 

const uniqueLaws = ["Status unclear or unknown", "Apparently disallowed by state or otherwise restricted by legal barriers","Authorized by state or otherwise currently in use, at least in certain jurisdictions"]

const capRangeNames = ["0-0.5 MW", "0.5-1.99 MW","2-4.99 MW", "5-19.99 MW", ">20 MW"]
    
const capRangeVals = [400, 1000, 3000, 6000, 21000]

let brokenLaw1 = ["Status unclear or", "unknown"]
    
let brokenLaw2 = ["Apparently disallowed", "by state or otherwise",  "restricted by legal", " barriers"]
    
let brokenLaw3= ["Authorized by state", "or otherwise currently", "in use, at least in", "certain jurisdictions"]
    
  
var size = 250;

let stateData = [{state: 'Alabama', thirdParty: "Apparently disallowed by state or otherwise restricted by legal barriers", solarSchools: 1, totalKW: 18},
                   {state: 'Alaska', thirdParty: "Status unclear or unknown", solarSchools: 3, totalKW: 13},
                   {state: 'Arizona', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 398, totalKW: 125187},
                   {state: 'Arkansas', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 7, totalKW: 1800},
                   {state: 'California', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 2465, totalKW: 616058},
                   {state: 'Colorado', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 115, totalKW: 9198},
                   {state: 'Connecticut', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 190, totalKW: 32171},
                   {state: 'Delaware', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 8, totalKW: 1657},
                   {state: 'District of Columbia', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 64, totalKW: 10280},
                   {state: 'Florida', thirdParty: "Apparently disallowed by state or otherwise restricted by legal barriers", solarSchools: 276, totalKW: 4650},
                   {state: 'Georgia', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 39, totalKW: 2659},
                   {state: 'Hawaii', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 112, totalKW: 11980},
                   {state: 'Idaho', thirdParty: "Status unclear or unknown", solarSchools: 25, totalKW: 515},
                   {state: 'Illinois', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 388, totalKW: 19997},
                   {state: 'Indiana', thirdParty: "Status unclear or unknown", solarSchools: 87, totalKW: 41076},
                   {state: 'Iowa', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 13, totalKW: 1863},
                   {state: 'Kansas', thirdParty: "Apparently disallowed by state or otherwise restricted by legal barriers", solarSchools: 11, totalKW: 312},
                   {state: 'Kentucky', thirdParty: "Apparently disallowed by state or otherwise restricted by legal barriers", solarSchools: 12, totalKW: 1785},
                   {state: 'Louisiana', thirdParty: "Status unclear or unknown", solarSchools: 8, totalKW: 390},
                   {state: 'Maine', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 25, totalKW: 1436},
                   {state: 'Maryland', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 174, totalKW: 16963},
                   {state: 'Massachusetts', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 255, totalKW: 71148},
                   {state: 'Michigan', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 52, totalKW: 3617},
                   {state: 'Minnesota', thirdParty: "Status unclear or unknown", solarSchools: 141, totalKW: 18649},
                   {state: 'Mississippi', thirdParty: "Status unclear or unknown", solarSchools: 1, totalKW: 100},
                   {state: 'Missouri', thirdParty: "Status unclear or unknown", solarSchools: 82, totalKW: 2733},
                   {state: 'Montana', thirdParty: "Status unclear or unknown", solarSchools: 41, totalKW: 486},
                   {state: 'Nebraska', thirdParty: "Status unclear or unknown", solarSchools: 2, totalKW: 19},
                   {state: 'Nevada', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 138, totalKW: 20159},
                   {state: 'New Hampshire', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 24, totalKW: 5255},
                   {state: 'New Jersey', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 583, totalKW: 181944},
                   {state: 'New Mexico', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 51, totalKW: 7049},
                   {state: 'New York', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 222, totalKW: 35907},
                   {state: 'North Carolina', thirdParty: "Apparently disallowed by state or otherwise restricted by legal barriers", solarSchools: 56, totalKW: 2657},
                   {state: 'North Dakota', thirdParty: "Status unclear or unknown", solarSchools: 1, totalKW: 80},
                   {state: 'Ohio', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 62, totalKW: 14069},
                   {state: 'Oklahoma', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 1, totalKW: 2},
                   {state: 'Oregon', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 72, totalKW: 5736},
                   {state: 'Pennsylvania', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 55, totalKW: 15330},
                   {state: 'Rhode Island', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 17, totalKW: 364},
                   {state: 'South Carolina', thirdParty: "Apparently disallowed by state or otherwise restricted by legal barriers", solarSchools: 42, totalKW: 2783},
                   {state: 'South Dakota', thirdParty: "Status unclear or unknown", solarSchools: 0, totalKW: 0},
                   {state: 'Tennessee', thirdParty: "Status unclear or unknown", solarSchools: 61, totalKW: 6642},
                   {state: 'Texas', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 114, totalKW: 7204},
                   {state: 'Utah', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 106, totalKW: 1649},
                   {state: 'Vermont', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 40, totalKW: 4317},
                   {state: 'Virginia', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 81, totalKW: 20214},
                   {state: 'Washington', thirdParty: "Status unclear or unknown", solarSchools: 99, totalKW: 3540},
                   {state: 'West Virginia', thirdParty: "Authorized by state or otherwise currently in use, at least in certain jurisdictions", solarSchools: 11, totalKW: 853},
                   {state: 'Wisconsin', thirdParty: "Status unclear or unknown", solarSchools: 129, totalKW: 4827},
                   {state: 'Wyoming', thirdParty: "Status unclear or unknown", solarSchools: 3, totalKW: 230}]

// helper functions

const sortDataBySchools = (data) => {
    const sorted = data.sort(function(a,b) {
        return b.solarSchools - a.solarSchools;
    });
    return sorted.map((state, index) => ({...state, schoolRank: index+1 }));
}

const sortDataByCapacity = (data) => {
    const sorted = data.sort(function(a,b) {
        return b.totalKW - a.totalKW;
    });
    return sorted.map((state, index) => ({...state, capacityRank: index+1 }));
}

 const lawColor = (lawStatus) => {
        if (lawStatus == "Status unclear or unknown") {
            return "#4EB1E9"; 
        }
        if (lawStatus == "Authorized by state or otherwise currently in use, at least in certain jurisdictions") {
            return "#F6772D"; 
        } else {return "#4C6B8B"}
    }
 
 const lawOpac = (lawStatus) => {
     if (lawStatus == "Status unclear or unknown") {
            return 0.3; 
        }
        if (lawStatus == "Authorized by state or otherwise currently in use, at least in certain jurisdictions") {
            return 1; 
        } else {return .6}  
 }
 
 const calcOpacity = (totalKW) => {
        const totalMW = totalKW / 1000;
        if (totalMW < 0.5) {
            return 0.2;
        } else if (totalMW < 1.99) {
            return 0.4;
        } else if (totalMW < 4.99) {
            return 0.6;
        } else if (totalMW < 19.99) {
            return 0.8;
        } else {
            return 1;
        }
    }
    

// drawing large svg canvas + margin convention 
const margin = {top:60, right:100, left:0, bottom:80}; 
    
const outerHeight = 900;
const outerWidth = 1000;
    
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
// data join and create map 

d3.json('us_states.json').then( (states) => {
    dataset = states; 
    // draw depending on what section you're in (for refresh)
    setTimeout(drawInitial(statePaths), 100)
})

    
// different draw functions 
 /*
    yellow: #F3F1A5
    orange: #F6772D
    light blue: #4EB1E9
    dark blue: #4C6B8B
    */ 
// all initial elements should be created in this function 
const drawInitial = (statePaths) => {
    
    // make canvas and join data 
    largeMap = d3.select("#vis").append("svg")
                    .attr("id", "map-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black");

    innerMap = largeMap.append("g"); 
    innerMap.attr("transform", "translate(" +margin.left+","+margin.top+")"); 

    
    const projection = d3.geoAlbersUsa().scale(innerWidth)
    pathGenerator = d3.geoPath().projection(projection);

    statePaths = innerMap.selectAll(".state-path")
        .data(dataset.features) //52 states
        .join("path")
        .attr("class", "state-path")
        .attr("d", pathGenerator);
    
    statePaths.attr("stroke", "white")
    statePaths.attr("stroke-width", 2)
    
    
    // data join with array
    for (i=0; i< stateData.length; i++) {
        let currentDataState = stateData[i].state;
        
        let current3party = stateData[i].thirdParty;
        let currentSolarSchools = stateData[i].solarSchools;
        let currentTotalKW = stateData[i].totalKW; 
        
        for (j = 0; j < dataset.features.length; j++) {
            let currentJsonState = dataset.features[j].properties.NAME; 
            if (currentJsonState == currentDataState) {
                dataset.features[j].properties.thirdParty = current3party;
                dataset.features[j].properties.solarSchools = currentSolarSchools; 
                dataset.features[j].properties.totalKW = currentTotalKW;
            }
        }
    }
    
// legends 
    
    legendG = innerMap.append("g")
                        .attr("class", "lawLegend")
    
    legCapLawG = innerMap.append("g").attr("class", "capLawLegend")
    legCapLawG.attr("transform", "translate("+
                 (innerWidth/2 - 230)+ "," + (innerHeight - 295)+ ")"); 
    

    legendG.attr("transform", "translate("+
                 (innerWidth/2 - 230)+ "," + (innerHeight - 295)+ ")"); 
    
       
    const lawlegendRects = legendG.selectAll(".lawLegRect")
                        .data(uniqueLaws)
                        .join("rect")
                        .attr("width", 170)
                        .attr("height", 40)
                        .attr("class", "lawLegRect")
                        .attr("x", (d, i)=> i*190 + 25)
                        .style("fill", d => lawColor(d))
                        .style("border", "1px solid black")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1); 
    
    const lawCapRects1 = legCapLawG.selectAll(".lawCapLegRect1")
                        .data(capRangeVals)
                        .join("rect")
                        .attr("width", 170)
                        .attr("height", 12)
                        .attr("class", "lawCapLegRect1")
                        .attr("x", 25)
                        .attr("y", (d, i)=> i*15 + 1)
                        .style("fill", d => lawColor("Status unclear or unknown"))
                        .style("opacity", d=>calcOpacity(d))
                        .style("border", "1px solid black")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .style("opacity", 0); 
    
    const lawCapRects2 = legCapLawG.selectAll(".lawCapLegRect2")
                        .data(capRangeVals)
                        .join("rect")
                        .attr("width", 170)
                        .attr("height", 12)
                        .attr("class", "lawCapLegRect2")
                        .attr("x", 215)
                        .attr("y", (d, i)=> i*15 + 1)
                        .style("fill", d => lawColor("chicken"))
                        .style("opacity", d=>calcOpacity(d))
                        .style("border", "1px solid black")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .style("opacity", 0); 
    
    const lawCapRects3 = legCapLawG.selectAll(".lawCapLegRect3")
                        .data(capRangeVals)
                        .join("rect")
                        .attr("width", 170)
                        .attr("height", 12)
                        .attr("class", "lawCapLegRect3")
                        .attr("x", 405)
                        .attr("y", (d, i)=> i*15 + 1)
                        .style("fill", d => lawColor("Authorized by state or otherwise currently in use, at least in certain jurisdictions"))
                        .style("opacity", d=>calcOpacity(d))
                        .style("border", "1px solid black")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .style("opacity", 0); 
    
    
    legendCapLabel = legCapLawG.selectAll(".capLegLabel")
                            .data(capRangeNames)
                            .attr("class", "capLegLabel")
                            .join("text")
                            .text((d)=> d)
                            .attr("x", -67)
                            .attr("y", (d, i) => 13+ i*15)
                            .style("opacity", 0); 
    
    

    legendLawLabel1 = legendG.selectAll(".lawLegLabel1")
                            .data(brokenLaw1)
                            .attr("class", "lawLegLabel1")
                            .join("text")
                            .text((d)=> d)
                            .attr("x", 30)
                            .attr("y", (d, i) => 60 + i*17)
                            .style("opacity", 1);  
    
      legendLawLabel2 = legendG.selectAll(".lawLegLabel2")
                            .data(brokenLaw2)
                            .attr("class", "lawLegLabel2")
                            .join("text")
                            .text((d)=> d)
                            .attr("x", 220)
                            .attr("y", (d, i) => 60 + i*17)
                            .style("opacity", 1); 
    
    legendLawLabel3 = legendG.selectAll(".lawLegLabel3")
                            .data(brokenLaw3)
                            .attr("class", "lawLegLabel3")
                            .join("text")
                            .text((d)=> d)
                            .attr("x", 420)
                            .attr("y", (d, i) => 60 + i*17)
                            .style("opacity", 1);  
    
    legendLawCapLabel1 = legCapLawG.selectAll(".lawLegCapLabel1")
                            .data(brokenLaw1)
                            .attr("class", "lawLegLabel1")
                            .join("text")
                            .text((d)=> d)
                            .attr("x", 30)
                            .attr("y", (d, i) => 90 + i*17)
                            .style("opacity", 0);  
    
      legendLawCapLabel2 = legCapLawG.selectAll(".lawLegCapLabel2")
                            .data(brokenLaw2)
                            .attr("class", "lawLegLabel2")
                            .join("text")
                            .text((d)=> d)
                            .attr("x", 220)
                            .attr("y", (d, i) => 90 + i*17)
                            .style("opacity", 0); 
    
    legendLawCapLabel3 = legCapLawG.selectAll(".lawLegCapLabel3")
                            .data(brokenLaw3)
                            .attr("class", "lawLegLabel3")
                            .join("text")
                            .text((d)=> d)
                            .attr("x", 420)
                            .attr("y", (d, i) => 90 + i*17)
                            .style("opacity", 0);  
    
     thirdPartyTitle = innerMap.append("text")
        .text("Third-Party Solar Power Purchase Agreement Policies")
        .style("text-anchor", "middle")
        .attr("transform", `translate(${innerWidth/2}, ${margin.top/3})`)
        .attr("dy", "1em")
        .attr("class", "mapTitle")
        .style("fill", "black")
        .style("opacity", 1); 
    
    capTitle = innerMap.append("text")
        .text("Third-Party Solar Power Purchase Agreement Policies and Total Solar Capacity")
        .style("text-anchor", "middle")
        .attr("transform", `translate(${innerWidth/2}, ${margin.top/3})`)
        .attr("dy", "1em")
        .attr("class", "mapTitle")
        .style("fill", "black")
        .style("opacity", 0); 
    
    solarSchoolsTitle = innerMap.append("text")
        .text("Third-Party Solar Power Purchase Agreement Policies, Total Solar Capacity, and Total Solar Schools")
        .style("text-anchor", "middle")
        .attr("transform", `translate(${innerWidth/2}, ${margin.top/3})`)
        .attr("dy", "1em")
        .attr("class", "mapTitle")
        .style("fill", "black")
        .style("opacity", 0); 
    
    statePaths.style("fill", d => lawColor(d.properties.thirdParty))
    statePaths.style("opacity", 1); 
    
   
    let maxSchools = d3.max(stateData, d=>d.solarSchools); 
    
    const rScale = d3.scaleSqrt()
                    .domain([0, maxSchools])
                    .range([0, 30]); 

    
     innerMap.selectAll(".school-centroid").data(dataset.features)
        .join("circle")
        .attr("class", "school-centroid")
        .attr("fill", "#4C6B8B")
        .style("opacity", 0)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("r", d=>rScale(d.properties.solarSchools))
        .attr("cx", function(d){ return pathGenerator.centroid(d)[0];})
        .attr("cy", function(d){ return  pathGenerator.centroid(d)[1];}); 
    
    innerMap.selectAll(".school-count").data(dataset.features)
        .join("text")
        .attr("class", "school-count")
        .text(d => d.properties.solarSchools)
        .style("font-weight", 800)
        .style("font-size", 11)
        .style("opacity", 0)
        .attr("x", function(d){ return pathGenerator.centroid(d)[0] - 12;})
        .attr("y", function(d){ return  pathGenerator.centroid(d)[1] - 5;}); 
    
    
    
    }

// hide all elements necessary for given chart type 
function clean(chartType) {
     innerMap.selectAll(".state-path").style("opacity", 1);
     statePaths = innerMap.selectAll(".state-path")
    if (chartType !== "schoolDots") {
        solarSchoolsTitle.style("opacity", 0)
        innerMap.selectAll(".school-centroid")
            .style("opacity", 0); 
        innerMap.selectAll(".school-count")
            .style("opacity", 0); 
         statePaths.on("mouseover", mouseOver)
              .on("mouseout", mouseOut)
              
    function mouseOver() {
        d3.select('#tooltip')
            .style('display', 'none')
    }
    function mouseOut() {
        d3.select("#tooltip")
            .style('display', 'none')
    }}
    
    if (chartType !== "justLaws") {
        thirdPartyTitle.style("opacity", 0)
        legendLawLabel1.style("opacity", 0); 
        legendLawLabel2.style("opacity", 0);
        legendLawLabel3.style("opacity", 0);
        d3.selectAll(".lawLegRect").style("opacity", 0);
    }
    if (chartType !== "capMap") {
        capTitle.style("opacity", 0)
        
    }
    if (chartType === "justLaws") {
        d3.selectAll(".lawCapLegRect1").style("opacity", 0)
        d3.selectAll(".lawCapLegRect2").style("opacity", 0)
        d3.selectAll(".lawCapLegRect3").style("opacity", 0)
        legendCapLabel.style("opacity", 0)
        legendLawCapLabel1.style("opacity", 0); 
        legendLawCapLabel2.style("opacity", 0);
        legendLawCapLabel3.style("opacity", 0);
    }

}

function drawLaws() {
    clean('justLaws')
    thirdPartyTitle.style("opacity", 1)
    legendLawLabel1.style("opacity", 1); 
    legendLawLabel2.style("opacity", 1); 
    legendLawLabel3.style("opacity", 1); 
    d3.selectAll(".lawLegRect").style("opacity", 1);
    statePaths = innerMap.selectAll(".state-path")
    statePaths.style("fill", d => lawColor(d.properties.thirdParty))
    statePaths.style("opacity", 1); 
    
      statePaths.on("mouseover", mouseOver)
              .on("mouseout", mouseOut)
              
    function mouseOver() {
        d3.select('#tooltip')
            .style('display', 'none')
    }
    function mouseOut() {
        d3.select("#tooltip")
            .style('display', 'none')
    }
    
    
}

function drawSchools() {
    clean('schoolDots')
    statePaths = innerMap.selectAll(".state-path")
    statePaths.style("fill", d => lawColor(d.properties.thirdParty))
    statePaths.style("opacity", d=>calcOpacity(d.properties.totalKW)); 
    innerMap.selectAll(".school-centroid")
                        .style("opacity", .8); 
    innerMap.selectAll(".school-count")
            .style("opacity", 1); 
    solarSchoolsTitle.style("opacity", 1)

    
    statePaths.on("mouseover", mouseOver)
              .on("mouseout", mouseOut)
              
    function mouseOver() {
     d3.select(this).style("fill", "#F3F1A5")
        statePaths.style("opacity", .1)
        d3.select(this).style("opacity", 1)
        const thisData = d3.select(this).data()[0]
        const sortedData = sortDataBySchools(stateData)
         d3.select('#tooltip')
            .style('left', (d3.pointer(event)[0] + 330)+ 'px')
            .style('top', (d3.pointer(event)[1] + 2*outerHeight) + 'px')
            .style('display', 'inline-block')
            .html(`<strong>State: </strong> ${thisData.properties.NAME} 
                <br> <strong>Solar Schools: </strong> ${thisData.properties.solarSchools} 
                <br> <strong>School Ranking: </strong> ${sortedData.find(s => s.state === thisData.properties.NAME).schoolRank}`)
    }
    function mouseOut() {
        d3.select("#tooltip")
            .style('display', 'none')
        statePaths.style("opacity", d=> calcOpacity(d.properties.totalKW))
        d3.select(this).style("fill", d => lawColor(d.properties.thirdParty))
        d3.select(this).style("opacity", d => calcOpacity(d.properties.totalKW))
    }
       d3.selectAll(".lawCapLegRect1").style("opacity", d=>calcOpacity(d))
    d3.selectAll(".lawCapLegRect2").style("opacity", d=>calcOpacity(d))
    d3.selectAll(".lawCapLegRect3").style("opacity", d=>calcOpacity(d))
      legendCapLabel.style("opacity", 1)
    legendLawCapLabel1.style("opacity", 1); 
        legendLawCapLabel2.style("opacity", 1);
        legendLawCapLabel3.style("opacity", 1);
}

function drawCapacity() {
    clean('capMap')
    statePaths = innerMap.selectAll(".state-path")
     statePaths.style("fill", d => lawColor(d.properties.thirdParty))
    statePaths.style("opacity", d => calcOpacity(d.properties.totalKW))
    d3.selectAll(".lawCapLegRect1").style("opacity", d=>calcOpacity(d))
    d3.selectAll(".lawCapLegRect2").style("opacity", d=>calcOpacity(d))
    d3.selectAll(".lawCapLegRect3").style("opacity", d=>calcOpacity(d))
    capTitle.style("opacity", 1)
    
     statePaths.on("mouseover", mouseOver)
              .on("mouseout", mouseOut)
              
    function mouseOver() {
        d3.select(this).style("fill", "#F3F1A5")
        statePaths.style("opacity", .1)
        d3.select(this).style("opacity", 1)
        const thisData = d3.select(this).data()[0]
        const sortedData = sortDataByCapacity(stateData)
        const ranking = sortedData.find(s => s.state === thisData.properties.NAME).capacityRank
         d3.select('#tooltip')
            .style('left', (d3.pointer(event)[0] + 330)+ 'px')
            .style('top', (d3.pointer(event)[1] + outerHeight) + 'px')
            .style('display', 'inline-block')
            .html(`<strong>State: </strong> ${thisData.properties.NAME} 
                <br> <strong>Total Capacity: </strong> ${(thisData.properties.totalKW/1000).toFixed(2)} MW 
                <br> <strong>Capacity Ranking: </strong> ${sortedData.find(s => s.state === thisData.properties.NAME).capacityRank}`)
    }
    function mouseOut() {
         d3.select(this).style("fill", d => lawColor(d.properties.thirdParty))
        d3.select(this).style("opacity", d => calcOpacity(d.properties.totalKW))
        statePaths.style("opacity", d=> calcOpacity(d.properties.totalKW))
        d3.select("#tooltip")
            .style('display', 'none')
    }
    
    
    legendCapLabel.style("opacity", 1)
     legendLawCapLabel1.style("opacity", 1); 
        legendLawCapLabel2.style("opacity", 1);
        legendLawCapLabel3.style("opacity", 1);
    
}


let activationFunctions = [
    drawLaws, 
    drawCapacity, 
    drawSchools 
]
   
    // scroller code 
    function scroller(){
    let container = d3.select('body')
    let dispatch = d3.dispatch('active', 'progress');
    let sections = d3.selectAll('.step')
    let sectionPositions
   
    let currentIndex = -1
    let containerStart = 0;

    function scroll(){
        d3.select(window)
            .on('scroll.scroller', position)
            .on('resize.scroller', resize)

        resize();

        let timer = d3.timer(function() {
            position();
            timer.stop();
        });
    }

    function resize(){
        sectionPositions = [];
        let startPos;
    
        sections.each(function(d, i) {
            let top = this.getBoundingClientRect().top;
        
            if (i === 0 ){
                startPos = top;
            }
            sectionPositions.push(top - startPos)
        });
    }

    function position() {
        let pos = window.pageYOffset - 300 - containerStart;
        let sectionIndex = d3.bisect(sectionPositions, pos);
        sectionIndex = Math.min(sections.size()-1, sectionIndex);
    
        if (currentIndex !== sectionIndex){
            dispatch.call('active', this, sectionIndex);
            currentIndex = sectionIndex;
        }
    
        let prevIndex = Math.max(sectionIndex - 1, 0);
        let prevTop = sectionPositions[prevIndex]
        let progress = (pos - prevTop) / (sectionPositions[sectionIndex] - prevTop);
        dispatch.call('progress', this, currentIndex, progress)
    }

    scroll.container = function(value) {
        if (arguments.legth === 0){
            return container
        } 
        container = value 
        return scroll 
    }

    scroll.on = function(action, callback){
        dispatch.on(action, callback)
    };

    return scroll;
}

// draw new graph based on index provided by scroll
let scroll = scroller()
    .container(d3.select('#graphic'))
scroll()

let lastIndex, activeIndex = 0

scroll.on('active', function(index){
    d3.selectAll('.step')
        .transition().duration(500)
        .style('opacity', function (d, i) {return i === index ? 1 : 0.1;});
    
    activeIndex = index
    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1; 
    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(i => {
        activationFunctions[i]();
    })
    lastIndex = activeIndex;

})

scroll.on('progress', function(index, progress){
    if (index == 2 & progress > 0.7){

    }
})