

var margin = {top: 50, right: 30, bottom: 50, left: 30};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// var xAxis = d3.axisBottom(xScale);
// var yAxis = d3.axisLeft(yScale);

// define svg as a G element that translates the origin to the top-left corner of the chart area

var canvas = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    	// .call(xAxis);

// With this convention, all subsequent code can ignore margins


var tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10, 0])
  .html(function(d) {
    //example:

        return d; 
  });






// define some data

var dataset = [[10, 10], [20, 20], [16, 0], [30, 12], [38, -30]];


// set the ranges
// var xScale = d3.scaleLinear()
// 	.domain([0,d3.max(dataset)])
//     .range([0, width]);

// var yScale = d3.scaleLinear()
//     .range([height, 0]);

// adds the x and y axis

/*d3.select(".axis")
    .call(d3.axisBottom(xScale))
    .call(d3.axisLeft(yScale));
*/

var line = canvas.append("line")
    .attr("x1", 0)
    .attr("y1", height/2)
    .attr("x2", width/2)
    .attr("y2", height/2)
    .attr("stroke-width", 2)
    .attr("stroke", "darkcyan")
    .style("stroke-dasharray", ("2, 2"))
    .style("opacity", .2); 


canvas.call(tip)

var circles = canvas.selectAll(".circle")
	.data(dataset)
	.enter().append("circle")
		// .style("fill", "darkcyan")
    .attr("class", "circle")
		.attr("cx", function (a,i) {return i * 60 + 10})
		.attr("cy", function(a) {return height/2})
		.attr("r", 5)
    
    
	
	  // .on("mouseover", function(){
   //    d3.select(this).transition().duration(300)
   //      .style("fill", "red")
   //      .style("opacity", 1);
   //  })


/* check this out to make the mouseover more smooth ...


node.on('mouseout', function() {
      d3.select(".d3-tip")
      .transition()
        .delay(100)
        .duration(600)
        .style("opacity",0)
        .style('pointer-events', 'none')
      });*/



    .on("mouseover", tip.show)
    
    // .on("mouseout", function(){
    //   d3.select(this).transition().duration(300)
    //     // .style("fill", "darkcyan")
    //     .style("opacity", .2);
    // })
    .on("mouseout", tip.hide)




	.transition()
	.delay(function(d, i) { return i * 1000 })
	.duration(1000)

  // calculate the new radius on the data (circle area as measure)

		.attr("r", function(a) { return Math.sqrt(a[0]*10/Math.PI)})

  // change position, depending on +/-VOTES -- Scale!!  
		
    .attr("cy", function(a) {return height/2 - 3*a[1]})
		
    // .style("opacity", .2)
		// .style("fill", "darkcyan")
		.style("stroke", "none");




// function getRadius(area) {
// 		return Math.sqrt(area / Math.PI);




// var text=svg
// 	.append("text")
// 	.text("hello world")
// 	.attr("y",100)
