	
angular.module('tsc')
    .directive('d3bubbleMe', d3bubbleMe);

d3bubbleMe	.$inject = ['$log', 'tscApi'];
function d3bubbleMe($parse, tscApi){
     //explicitly creating a directive definition variable
     //this may look verbose but is good for clarification purposes
     //in real life you'd want to simply return the object {...}
     var directiveDefinitionObject = {

         //We restrict its use to an element
         //as usually  <bars-chart> is semantically
         //more understandable
         restrict: 'E',
         //this is important,
         //we don't want to overwrite our directive declaration
         //in the HTML mark-up
         replace: false,
         scope : true, 
         //scope: {chartData: '=chartData'},
         link: function (scope, element, attrs) {
           
         	console.log("d3bubbleMe.link called");
         	console.log(scope);
         	console.log(element);
         	console.log(attrs);

            var margin = {top: 50, right: 30, bottom: 50, left: 30};
            var width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // var xAxis = d3.axisBottom(xScale);
            // var yAxis = d3.axisLeft(yScale);

            // define svg as a G element that translates the origin to the top-left corner of the chart area

            var canvas = d3.select(element[0]).append("svg")  //select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

         	scope.$watch('vm.bubbleData', function(newData, oldData){

         		console.log("newData");
         		console.log(newData);
         		console.log(oldData);


	            var tip = d3.tip()
	              .attr("class", "d3-tip")
	              .offset([-10, 0])
	              .html(function(d,i) {

	              		var thesis = newData.theses[i];
	                	//console.log(JSON.stringify(newData.theses[i]));
	                	console.log(thesis);

	                	var tip = "<h1>point "+i+"</h1>"+d;



	                	try{
		                	tip = tip + "<br>" + thesis.text;
		                	tip = tip + thesis.vote_pro;
		                	tip = tip + "<hr>";
		                	tip = tip + thesis.vote_con; 
		                	//tip =+ thesis["author"]["first_name"] + " " + thesis["author"]["last_name"];
		                	//tip =+ "<img src='http://tagesspiegel/" +thesis["author"].images.portrait+"'' />";
						}catch(err){
							console.log(err);
						}

	                	try{
	                		tscApi.dummycall();
	                	}catch(err){console.log(err)}

	                	//for (var thesis in newData.theses) {}
	                
	                    return tip; 
	              });

	            var dataset = newData.bubbles;// [[10, 10], [20, 20], [16, 0], [30, 12], [38, -30]];

	            if (dataset === undefined)
	            	return;

	            canvas.selectAll("*").remove();


	            // set the ranges
	            // var xScale = d3.scaleLinear()
	            //  .domain([0,d3.max(dataset)])
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
	                .attr("x2", width)
	                .attr("y2", height/2)
	                .attr("stroke-width", 2)
	                .attr("stroke", "darkcyan")
	                .style("stroke-dasharray", ("2, 2"))
	                .style("opacity", 0.2); 
		            canvas.call(tip);

	            var circles = canvas.selectAll(".circle")
	                .data(dataset)
	                .enter().append("circle")
	                    // .style("fill", "darkcyan")
	                .attr("class", "circle")
                    .attr("cx", function (a,i) {return i * 60 + 10;})
                    .attr("cy", function(a) {return height/2;})
                    .attr("r", 5)
                    //.attr("text", function(a,i){ return newData.theses[i]["text"]})
	                .on("mouseover", tip.show)
	                .on("mouseout", tip.hide)
	                .transition()
	                .delay(function(d, i) { return i * 200;})
	                .duration(200)

	              // calculate the new radius on the data (circle area as measure)
	                .attr("r", function(a) { return Math.sqrt(a[0]*50/Math.PI);})
	              // change position, depending on +/-VOTES -- Scale!!  
	                .attr("cy", function(a) {return height/2 - 5*a[1];})    
	                // .style("opacity", .2)
	                // .style("fill", "darkcyan")
	                .style("stroke", "none");

			});//~watch
      	} //~link
  	} //~directiveDefinitionObject
  	return directiveDefinitionObject;
}//~d3bubbleMe
