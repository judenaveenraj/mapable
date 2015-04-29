var MapableRoute= (function(map, origin, destination, options){
    
    var model = {
        
        origin:  origin? origin: undefined,
        destination:destination? destination: undefined,
        _map: map? map : undefined,
        _route: data? data : undefined,
        _options: options? options :    undefined,
        
        getRoutes: function(){
            gmap.getRoutes({
                travelMode: "driving",
                origin : this.origin,
                destination : this.destination,
                callback: this.setPrimaryRoute
            }); 
        },
        
        setPrimaryRoute: function(results){
            if(results.length > 0){
                this._route = new GMaps.Route({
                              map: this._map,
                              route: results[0],
                              strokeColor: this._options? this._options.strokeColor : "#336699",
                              strokeOpacity: this._options? this._options.strokeOpacity : 0.5,
                              strokeWeight: this._options? this._options.strokeWeight : 10
                            });
                console.log(this._route)
                for (var step in groute.steps){ groute.forward() };
            }
        }
    };
    
    var controller = {
        getRoutes: function(){
            model.getRoutes();
        }
    };
    
    var view = {
        container: $("planner")
    
    }
    
    function bindEvents(){
        
    }
    
    return {
        init: function(){
            bindEvents();
        },
        
        getRoute: function(){
            this.controller.getRoutes();
        }
            
    
    } 
});