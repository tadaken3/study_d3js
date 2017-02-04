var w = 800;
var h = 500;
var xScale = d3.scale.linear().range([0, w]);
var yScale = d3.scale.linear().range([0, h]);
var color = d3.scale.category20();
var root, node;

var treemap = d3.layout.treemap()
    .round(false)
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.value; });

var svg = d3.select("#treemap")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g")
    .attr("transform", "translate(.5,.5)");

d3.json("data.json")
        .mimeType('application/json; charset=shift_jis')
        .on('load', function (data) {
    node = root = data;

    var list = d3.select('#list').selectAll('li')
    .data(root.children)
    .enter()
    .append('li')
    .text(function(d){ return d.name })
    .style("color", function(d){ return color(d.name) })

    var nodes = treemap.nodes(root)
    .filter(function(d) { return !d.children; });

    var cell = svg.selectAll("g")
    .data(nodes)
    .enter().append("svg:g")
    .attr("class", "cell")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });

  cell.append("svg:rect")
      .attr("width", function(d) { return d.dx - 1; })
      .attr("height", function(d) { return d.dy - 1; })

      .attr("fill",function(d){ return d.children ? null : color(d.parent.name); }) // 一番下の子だけ親に合わせて色を変える。
      .append('title')

  cell.append("svg:text")
      .attr("x", function(d) { return d.dx / 2; })
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr('class', 'label')
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; })
      .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; })
      .text(function(d){ return d.name + " /" + d.value})

  d3.select(window).on("click", function() { zoom(root); });

})
.get();


function zoom(obj) {

  var kx = w / obj.dx, ky = h / obj.dy;
  xScale.domain([obj.x, obj.x + obj.dx]);
  yScale.domain([obj.y, obj.y + obj.dy]);

  var t = svg.selectAll("g.cell").transition()
      .duration(d3.event.altKey ? 7500 : 750)
      .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });

  t.select("rect")
      .attr("width", function(d) { return kx * d.dx - 1; })
      .attr("height", function(d) { return ky * d.dy - 1; })

  t.select(".label")
      .attr("x", function(d) { return kx * d.dx / 2; })
      .attr("y", function(d) { return ky * d.dy / 2; })
      .style("opacity", function(d) {
    d.w = this.getComputedTextLength();
    return (d.dx > d.w  || obj.name !='root') ? 1 : 0;
    });

    node = obj;
    d3.event.stopPropagation();
}