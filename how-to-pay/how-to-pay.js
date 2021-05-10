// How to Pay for Solar visualization

const margin = {top:40, right:40, left:80, bottom:40};
    
const outerHeight = 600;   // can change dimensions
const outerWidth = 700;
    
// make an inner svg to put graph in, put labels and other stuff in margins
const innerHeight = outerHeight - margin.top - margin.bottom; 
const innerWidth = outerWidth - margin.left - margin.right;   
    
// sunburst: https://bl.ocks.org/kerryrodden/7090426
    
let largePay, innerPay, arc, radius, pie, payArcs, howPayPie; 

let largeSize, innerSize, sizeRange, paySizeScale, rangeLeg, sizeLeg; 

let size1Rects, size2Rects, size3Rects, size4Rects, size5Rects, size6Rects; 


/* join data to innerSolar, which is placed inside the larger 
   svg according to the margins (which you can change)
*/

let payData = [{fintype: "", amount: }];

const pieWidth = 300
const pieHeight = 300


const drawPieInitial = () => {
    largePay = d3.select("#vis").append("svg")
                    .attr("id", "pay-main")
                    .attr("height", outerHeight)
                    .attr("width", outerWidth)
                    .style("border", "1px solid black");

    innerPay = largePay.append("g"); 
    
    arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(pieWidth, pieHeight) / 2 - 1)
    
    pie = d3.pie()
    .sort(null)
    .value(d => d.amount)
    
    payArcs = pie(payData)

    radius = Math.min(pieWidth, pieHeight) / 2 * 0.8;

    innerPay.attr("transform", "translate(" +(margin.left + radius)+","+(margin.top + radius) + ")"); 


    howPayPie = innerPay.append('g').attr("stroke", "white")
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
    
    innerSize = largePay.append("g"); 
    innerSize.attr("transform", "translate(" +margin.left-10 +","+margin.top+")"); 
    
}

setTimeout(drawPieInitial(), 100);

function clean(chartType) {
    if (chartType !== "howPayPie") {
        innerPay.transition()
                .duration(2000)
            .style("opacity", 0)
    }
}

function drawHowPay() {
    clean("howPayPie")
    innerPay.transition()
                .duration(2000)
            .style("opacity", 1)
}

function undrawHowPay() {
    clean("payBySizePie")
}

// scrolling functionality 

let activationFunctions = [
    drawHowPay, 
    undrawHowPay
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
