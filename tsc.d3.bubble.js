//var circleRadii = [40, 20, 10];

var bubbleMe = (function(){

	var dataset,
		workScale = d3.scale.linear()
			.domain( [ 1, 15 ] )
			.range( [ 3, 20 ] ),
		yearScale = d3.scale.linear()
			.domain( [ 1900, 1980 ] )
			.range( [ 0, 800 ] );

	d3.csv( "http://projects.kraeutli.com/cdv/data.php", function( data ) {
		
		dataset = data;
		
		for( var i = 0; i < dataset.length; i++ ) {
			
			dataset[ i ].year_composed = +dataset[ i ].year_composed;
			dataset[ i ].year_composed_to = +dataset[ i ].year_composed_to;
			dataset[ i ].year_poet_born = +dataset[ i ].year_poet_born;
			dataset[ i ].year_poet_died = +dataset[ i ].year_poet_died;
			
		}
		
		make();
		
	} );

	return{

	make: (function make() {
		
		var svg = d3.select( "body" ).append( "svg" )
			.attr( "width", 800 )
			.attr( "height", 600 );
			
		var works = svg.append( "g" )
			.attr( "id", "works" )
			.attr( "transform", "translate( 0, 100 )" );
		
		worksData = d3.nest()
			.key( function( d ) {
			
				return d.cycle_id;
				
			} )
			.entries( dataset );
			
		for( var i = 0; i < worksData.length; i++ ) {
			
			worksData[ i ].x = yearScale( d3.mean( worksData[ i ].values, function( v ) { return v.year_composed; } ) );
			worksData[ i ].y = 0;
			
			worksData[ i ].r = workScale( worksData[ i ].values.length );
					
		}
		
		arrange( worksData );
		
		works.selectAll( "g.work" ).data( worksData )
			.enter()
		.append( "g" )
			.attr( "class", "work" )
			.attr( "transform", function( d ) { 
				
				return "translate( " + d.x + ", " + d.y + " )";
				
			} )
		.append( "circle" )
			.attr( "r", function( d ) {
			
				return d.r;
				
			} );
		
	}()),

	arrange: (function arrange( data ) {			

		function collide( node ) {
			
			var r = node.r,
				nx1 = node.x - r,
				nx2 = node.x + r,
				ny1 = node.y - r,
				ny2 = node.y + r;
				
			return function( quad, x1, y1, x2, y2 ) {
				
				if ( quad.point && ( quad.point !== node ) ) {
					
					var x = node.x - quad.point.x,
						y = node.y - quad.point.y || 1,
						l = Math.sqrt(x * x + y * y);
						
					r = node.r + quad.point.r + 3;
				
					if ( l < r ) {
				
						l = ( l - r ) / l ;

						node.y -= y *= l;
						quad.point.y += y;	
				
					}
				}
				
				return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
				
			};			
		
		}
		
		var iterations = 25;

		while ( --iterations ) {

			var i = 0,
				n = data.length,
				q = d3.geom.quadtree()
					.x( function( d ) { return d.x; } )
					.y( function( d ) { return d.y; } )
					( data );

			while ( ++i < n ) q.visit( collide( data[ i ] ) ) ;

		}
			
	})
};

});