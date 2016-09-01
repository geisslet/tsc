	
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

	            var tip = d3.tip()
	              .attr("class", "d3-tip")
	              .offset([-10, 100])
	              .html(function(d,i) {

	              		console.log(newData);

	              		var thesisId = Object.keys(newData.theses)[i];
						var thesis = newData.theses[thesisId];

	                	var hmtl = "";

	                	try{

	                		// pro voters
	                		var divProAuthors = "<div>";
	                		var divProDots = "<pie-container class=\"pie-container-pro\" style=\"position:inherit\">";
	                		for (var a = 0; a <= thesis.vote_pro_authors.length; a++) {

	                			//console.log(thesis.vote_pro_authors.length + " " + a);


	                			//var author = Object.values(thesis["vote_pro_authors"])[a];
	                			var author = thesis.vote_pro_authors[a];
	                			if (author === undefined)
	                				break;

	                			divProAuthors = divProAuthors + "<img class=\"d3-tip-img\" src=\"https://causa.tagesspiegel.de" + author.images.thumbnail+"\" alt=\""+author.first_name+" "+author.last_name+"\">";
								divProDots = divProDots + "<pie class=\"pie-pro\"></pie>";
	                		}
	                		divProAuthors = divProAuthors + "</div>";
	                		divProDots =  divProDots + "</pie-container>";
	                		//~pro voters

							hmtl = hmtl + "<div class=\"d3-tip-pro\"><table><tr><th>" + divProDots + "</th><th>" + divProAuthors+"</th></tr><table></div>";
		                	hmtl = hmtl + "<p class=\"d3-tip-text\">»" + thesis.text + "«</p>";
		                	
		                	// con voters
	                		var divConAuthors = "<div>";
	                		var divConDots = "<pie-container class=\"pie-container-con\" style=\"position:inherit\">";
	                		for (a = 0; a <= thesis.vote_con_authors.length; a++) {
	                			var author = thesis.vote_con_authors[a];
	                			if (author === undefined)
	                				break;
	                			divConAuthors = divConAuthors + "<img class=\"d3-tip-img\" src=\"https://causa.tagesspiegel.de"+author.images.thumbnail+"\" alt=\""+author.first_name+" "+author.last_name+"\">";
								divConDots = divConDots + "<pie class=\"pie-con\"></pie>";
	                		}
	                		divConAuthors = divConAuthors + "</div>";
	                		divConDots =  divConDots + "</pie-container>";
							hmtl = hmtl + "<div class=\"d3-tip-con\"><table><tr><th>" + divConDots + "</th><th>" + divConAuthors +"</th></tr><table></div>";
							//~con voters
		 

						}catch(err){
							hmtl = hmtl + "<h3 style=\"color: red\">internal error - check console</h3>";
							console.log(err);
						}

	                	try{
	                		// just a test for calling angular controller function
	                		tscApi.dummycall();
	                	}catch(err){
	                		console.log(err);
	                	}
	                
	                    return hmtl; 
	              });

	            var dataset = newData.bubbles;// [[10, 10], [20, 20], [16, 0], [30, 12], [38, -30]];

	            if (dataset === undefined)
	            	return;

	            canvas.selectAll("*").remove();


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

		        var participateMin = d3.min(dataset, function(d) {    //Returns the participation on thesis
				    					return d[0];  //References first value in each sub-array
									  });

		        var participateMax = d3.max(dataset, function(d) {    //Returns the participation on thesis
				    					return d[0];  //References first value in each sub-array
									  });

		        var voteMin = d3.min(dataset, function(d) {    //Returns the participation on thesis
				    					return d[1];  //References first value in each sub-array
									  });

		        var voteMax = d3.max(dataset, function(d) {    //Returns the participation on thesis
				    					return d[1];  //References first value in each sub-array
									  });

		        console.log("participants min:"+participateMin+"|max:"+participateMax+", votes min:"+voteMin+"max:"+voteMax);

	            var rscale = d3.scaleLinear()
	            			.domain([participateMin,participateMax])
  							.range([0,width]);

  				console.log(rscale);

  				console.log("max value of bubbles" + Math.max(dataset));

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

			}); //~watch
      	} //~link
  	}; //~directiveDefinitionObject
  	return directiveDefinitionObject;
}//~d3bubbleMe
