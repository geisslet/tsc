
angular.module('tsc')
    .directive('d3bubbleMe', d3bubbleMe);

function d3bubbleMe($parse){
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
         link: function (scope, element, attrs) {
           
            var margin = {top: 5, right: 3, bottom: 5, left: 3};

            var width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // define svg as a G element that translates the origin to the top-left corner of the chart area

            var canvas = d3.select(element[0]).append("svg")//d3.select("body").append("svg")
                //.attr("width", width + margin.left + margin.right)
                //.attr("height", height + margin.top + margin.bottom)

                .attr("class", "chart")

                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                  //.call(xAxis);

            // With this convention, all subsequent code can ignore margins


            // define some data

            var dataset = [[10, 10], [20, 20], [16, 0], [30, 12], [38, -30]];

            var circles = canvas.selectAll("circle")
              .data(dataset)
              .enter()
                .append("circle")
                .style("fill", "darkcyan")
                .attr("cx", function (a,i) {return i * 60 + 20;})
                .attr("cy", function(a) {return height/2;})
                .attr("r", 5)
              
              .on("mouseover", function(){
                  d3.select(this).transition().duration(300)
                    .style("fill", "red")
                    .style("opacity", 1);
                })
                
                .on("mouseout", function(){
                  d3.select(this).transition().duration(300)
                    .style("fill", "darkcyan")
                    .style("opacity", 0.2);
                })

              .transition()
              .delay(function(d, i) { return i * 1000; })
              .duration(1000)
                .attr("r", function(a) { return a[0]; })
                .attr("cy", function(a) {return height/2 - 3*a[1]; })
                .style("opacity", 0.2)
                .style("fill", "darkcyan")
                .style("stroke", "none");
           

/*
           //converting all data passed thru into an array
           var data = attrs.chartData.split(',');
           //in D3, any selection[0] contains the group
           //selection[0][0] is the DOM node
           //but we won't need that this time
           var chart = d3.select(element[0]);
           //to our original directive markup bars-chart
           //we add a div with out chart stling and bind each
           //data entry to the chart
            chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter().append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
           //a little of magic: setting it's width based
           //on the data value (d) 
           //and text all with a smooth transition*/
         } 
      };
      return directiveDefinitionObject;
}

