var MapableRoute= (function(map, origin, destination, options){
    
    var model = {
        
        origin:  origin? origin: undefined,
        destination:destination? destination: undefined,
        _map: map? map : undefined,
        _route: undefined,
        _options: options? options :    undefined,
        
        getRoutes: function(){
            var self = this;
            Mapable.getMap().getRoutes({
                travelMode: "driving",
                origin : this.origin,
                destination : this.destination,
                callback: function(results){
                    self.setPrimaryRoute.bind(self, results)()
                }
                
            }); 
        },
        
        setPrimaryRoute: function(results){
            var self = this;
            console.log("asdasd")
            if(results.length > 0){
                this._route = new GMaps.Route({
                              map: self._map,
                              route: results[0],
                              strokeColor: this._options? this._options.strokeColor : "#336699",
                              strokeOpacity: this._options? this._options.strokeOpacity : 0.5,
                              strokeWeight: this._options? this._options.strokeWeight : 10
                            });
                if(this._route != undefined)
                    console.log("Loaded Route onto Map")
                for (var step in this._route.steps){ this._route.forward() };
            }
        }
    };
    
    var controller = {
        getRoutes: function(){
            model.getRoutes();
        }
    };
    
    var view = {
        container: $("planner"),
        init: function(){
            this.container.addClass("planner");
        },
        show: function(){
            this.container.addClass("active");
        }
    
    }
    
    function bindEvents(){
        
    }
    
    return {
        init: function(){
            view.init();
            bindEvents();
        },
        
        loadRoute: function(){
            controller.getRoutes();
        },
        getRoute: function(){return model;}
            
    
    } 
});