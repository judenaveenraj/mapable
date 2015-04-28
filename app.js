D_ORIGIN = "Bangalore"
D_DESTINATION = "Trichy"


var g_origin = {
    name : D_ORIGIN,
    lat :null,
    lng :null
};

var g_destination = {
    name : D_DESTINATION,
    lat : null,
    lng : null
};


var gmap;
var groute;





function startRouting(){
    gmap.getRoutes({
        travelMode: "driving",
        origin : g_origin.name,
        destination : g_destination.name,

        callback: function(results){
                   groute = new GMaps.Route({
                      map: gmap,
                      route: results[0],
                      strokeColor: "#336699",
                      strokeOpacity: 0.5,
                      strokeWeight: 10
                    });
                    console.log(groute)
                    for (var step in groute.steps){ groute.forward() };
                    }
        
        });

}













function createAndCenterGmapOnOrigin(latitude, longitude){
    gmap = new GMaps({
          div: '#map',
          lat: latitude,
          lng: longitude
        });
}

function initialize() {
    
    
   
    
    // GeoCode the origin and destination
    failed = false;
    
    GMaps.geocode({
    "address" : g_origin.name,
    "callback" : function(result, status){
            if(status == "OK"){
                g_origin.lat = result[0].geometry.location.k;
                g_origin.lng = result[0].geometry.location.D;
                createAndCenterGmapOnOrigin( g_origin.lat, g_origin.lng );
            }
        else
            failed = true;
        }
    });
    
    
    GMaps.geocode({
    "address" : g_destination.name,
    "callback" : function(result, status){
            if(status == "OK"){
                g_destination.lat = result[0].geometry.location.k;
                g_destination.lng = result[0].geometry.location.D;
            }
        else failed = true
        }
    });
    
    
    
    if(failed)
        alert("Everything is over");
    
    else
        setTimeout(startRouting, 2000);
    
}
google.maps.event.addDomListener(window, 'load', initialize);
