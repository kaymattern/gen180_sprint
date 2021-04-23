// Map visualization

// state data array
/* 

3rd party policies: https://ncsolarcen-prod.s3.amazonaws.com/wp-content/uploads/2019/07/DSIRE_3rd-Party-PPA_June_2019.pdf

Number of solar schools: https://www.thesolarfoundation.org/solar-schools/ 
*/

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
                   {state: 'West Virginia', thirdParty: "Apparently disallowed by state or otherwise restricted by legal barriers", solarSchools: 11, totalKW: 853},
                   {state: 'Wisconsin', thirdParty: "Status unclear or unknown", solarSchools: 129, totalKW: 4827},
                   {state: 'Wyoming', thirdParty: "Status unclear or unknown", solarSchools: 3, totalKW: 230}]

const sortDataByCapacity = (data) => {
    const sorted = data.sort(function(a,b) {
        return b.totalKW - a.totalKW;
    });
    return sorted.map((state, index) => ({...state, capacityRank: index+1 }));
}
    
const margin = {top:80, right:50, left:50, bottom:80}; 
    
const outerHeight = 800;
const outerWidth = 1000;
    
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
    
const largeMap = d3.select("body").append("svg")
                    .attr("id", "map-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black");

const innerMap = largeMap.append("g"); 
innerMap.attr("transform", "translate(" +margin.left+","+margin.top+")"); 

d3.json('us_states.json').then( (states) => {
    const projection = d3.geoAlbersUsa().scale(1000)
        //.center()
    const pathGenerator = d3.geoPath().projection(projection);

    const statePaths = innerMap.selectAll(".state-path")
        .data(states.features) //52 states
        .join("path")
        .attr("class", "state-path")
        .attr("d", pathGenerator);
    
    statePaths.attr("stroke", "white")
    statePaths.attr("stroke-width", 3)
    
    
    // data join with array
    for (i=0; i< stateData.length; i++) {
        let currentDataState = stateData[i].state;
        
        let current3party = stateData[i].thirdParty;
        let currentSolarSchools = stateData[i].solarSchools;
        let currentTotalKW = stateData[i].totalKW; 
        
        for (j = 0; j < states.features.length; j++) {
            let currentJsonState = states.features[j].properties.NAME; 
            if (currentJsonState == currentDataState) {
                states.features[j].properties.thirdParty = current3party;
                states.features[j].properties.solarSchools = currentSolarSchools; 
                states.features[j].properties.totalKW = currentTotalKW;
            }
        }
    }
    
const drawCap = (statePaths) => {

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

    statePaths.style("fill", "#F6772D")
    statePaths.style("opacity", d => calcOpacity(d.properties.totalKW))

    statePaths.on("mouseover", function() {
        d3.select(this).style("fill", "#4C6B8B")
        d3.select(this).style("opacity", 1)
        const thisData = d3.select(this).data()[0]
        stateNameSpan.text(thisData.properties.NAME)
        stateCapacitySpan.text((thisData.properties.totalKW/1000).toFixed(2) + " MW")
        const sortedData = sortDataByCapacity(stateData)
        const ranking = sortedData.find(s => s.state === thisData.properties.NAME).capacityRank
        stateRankingSpan.text("" + ranking)
        tooltip.style("opacity", 1)

    }).on("mouseout", function() {
        d3.select(this).style("fill", "#F6772D")
        d3.select(this).style("opacity", d => calcOpacity(d.properties.totalKW))
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

    let stateName = tooltip.append("div").text("State: ")
    let stateNameSpan = stateName.append("span")

    let stateCapacity = tooltip.append("div").text("Capacity: ")
    let stateCapacitySpan = stateCapacity.append("span")

    let stateRanking = tooltip.append("div").text("Ranking: ")
    let stateRankingSpan = stateRanking.append("span")
    
      
    const rangeNames = ["0-0.5 MW", "0.5-1.99 MW","2-4.99 MW", "5-19.99 MW", ">20 MW"]
    
    const rangeVals = [400, 1000, 3000, 6000, 21000]
    
    var size = 150;
    const totalLegSpace = size*rangeNames.length + 5*rangeNames.length; 
    const legendBottom = largeMap.append("g"); 
    legendBottom.attr("transform", "translate("+(outerWidth/2 -  totalLegSpace/2)+","+(innerHeight + margin.top)+ ")"); 
    
    const legRects = legendBottom.selectAll(".legRects")
                        .data(rangeVals)
                        .join("rect")
                        .attr("class", "legRects")
                        .attr("width", size)
                        .attr("height", 40)
                        .attr("x", (d, i) => i*size)
                        .style("fill", "#F6772D")
                        .style("opacity", d=>calcOpacity(d))
                        .style("border", "1px solid black"); 
    
    // http://bl.ocks.org/mundhradevang/1387786
    const legLabels = legendBottom.selectAll(".legLabels")
                        .data(rangeNames)
                        .join("text")
                        .attr("class", "legLabels")
                        .attr("font-size", 10)
                        .text(d => d)
                        .style("max-length", size)
                        .attr("x", (d, i) => i*size +5)
                        .attr("y", 20)
                        .attr("text-anchor", "left")
                        .style("alignment-baseline", "middle"); 
  
    const legTitle = legendBottom.append("text")
                        .attr("class", "legTitle")
                        .attr("font-size", 20)
                        .style("text-anchor", "middle")
                        .text("Total Solar Capacity in K-12 Schools by State:")
                        .attr("x", totalLegSpace/2)
                        .attr("y", -15); 
    
    }

    drawCap(statePaths); 
})