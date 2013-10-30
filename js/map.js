
var width = 960,
    height = 500;

var projection = d3.geo.orthographic()
    .translate([width / 2, height / 2])
    .scale(200)
    .rotate([98,-39])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var line = svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);


d3.json("js/world-110m.json", function(error, world) {

  svg.append("path")
      .datum(topojson.feature(world, world.objects.land))
      .attr("id", "land")
      .attr("d", path);

  var λ = d3.scale.linear()
      .domain([0, width])
      .range([-180, 180]);

  var φ = d3.scale.linear()
      .domain([0, height])
      .range([90, -90]);

  svg.append("circle")
      .datum({x: 0, y: 90})
      .attr("class", "mouse")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale())
      .call(d3.behavior.drag()
        .origin(Object)
        .on("drag", function(d) {
          var p = d3.mouse(this);
          projection.rotate([λ(p[0]), φ(p[1])]);
          svg.selectAll("path").attr("d", path)
        }));

});
