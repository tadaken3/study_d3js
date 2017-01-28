var width = 800;
var height = 800;

var color10 = d3.scale.category10();

var treemap = d3.layout.treemap()
    .size([width, height])

d3.json("data_.json", function(data) {
var tmap = d3.select("#treemap")
    .selectAll("rect")
    .data(treemap.nodes(data))
    console.log(treemap.nodes(data))

tmap.enter()
    .append("rect")
    .attr("class","block")
    .attr("x", function(d){return d.x;})
    .attr("y", function(d){return d.y;})
    .attr("width", function(d){return d.dx;})
    .attr("height", function(d){return d.dy;})
    .attr("fill",function(d){ 
        return d.children ? null : color10(d.parent.name); 
    }) // 一番下の子だけ親に合わせて色を変える。
    .attr("stroke","white")
tmap.enter()
    .append("text")
    .attr("x", function(d){ return d.x + (d.dx/2); }) // 各rectの真ん中に配置。
    .attr("y", function(d){ return d.y + (d.dy/2); }) // 各rectの真ん中に配置。
    .attr("text-anchor","middle")
    .text(function(d){ return d.children ? "" : d.name; }) // 一番下の子の名前だけ表示。
    .attr("stroke", "black");
    
})
