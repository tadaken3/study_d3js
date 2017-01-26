var color = d3.scale.category10()

d3.csv("./data_.csv", function(error, data){
    var tmp = [ ];
    for(var i=0; i<data.length; i++){
        tmp.push({name : data[i]["app_name"],
        value : data[i]["grossing"],
        category : data[i]["category"]});
    }
     var dataset = {
         children: tmp
    };
    drawTreemap(dataset);
})

function drawTreemap(dataset){
    var treemap = d3.layout.treemap()
        .size([800, 800])
        
    var tmap = d3.select("#treemap")
            .selectAll("rect")
            .data(treemap.nodes(dataset))

        tmap.enter()
            .append("rect")
            .attr("class", "block")
            .attr("x", function(d, i){
                return d.x;
            })
            .attr("y", function(d, i){
                return d.y;
            })
            .attr("width", function(d, i){
                return d.dx;
            })
            .attr("height", function(d, i){
                return d.dy;
            })
            
            .style("fill", function(d, i){
                if(d.category == "ドラえもん"){
                    return color(1); 
                }else if (d.category == "キテレツ"){
                    return color(2);
                }else if(d.category == "スヌーピー"){
                    return color(3);
                }else{
                    return color(i);
                }
            })
            
        tmap.enter()
            .append("text")
            .attr("class", "name")
            .attr("transform", function(d,i){
                return "translate(" + (d.x + d.dx/2) + "," + (d.y + d.dy/2) + ")";
            })
            .attr("dy", "0.2em")
            .text(function(d,i){
                return d.name;
            })
            .style("font-size", function(d, i){
                return (d.dx + d.dy) / 30 + "px";
            })
}