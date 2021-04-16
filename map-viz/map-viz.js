// Map visualization
    
const margin = {top:80, right:50, left:120, bottom:80}; 
    
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

})