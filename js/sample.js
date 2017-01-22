var dataset = [10, 20, 10, 15, 250];

d3.select("#myGraph")
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 10)
    .attr("y", function(d,i){
        return i * 25;
    })
    .attr("width", "0px")
    .attr("height", "20px")
    .transition()
    .delay(function(d,i){
        return i * 500;
    })
    .duration(2500)
    .attr("width", function(d, i){
        return d + "px"
    });



var xScale = d3.scale.linear()
    .domain([0, 300])
    .range([0, 300])
    
d3.select("#myGraph")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(10, "+((1+dataset.length) * 20 +5) + ")")
    .call(d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
    )
