var MapableRoute= (function(map, origin, destination, options){
    
    var model = {
        
        origin:  origin? origin: undefined,
        destination:destination? destination: undefined,
        legs: [],
        numSteps: 0,
        _map: map? map : undefined,
        _route: undefined,
        _options: options? options :    undefined,
        
        fetchPrimaryRoute: function(){
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
            console.log(results[0]);
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
                console.log(this._route);
                for (var step in this._route.steps){ 
                    this._route.forward();
                };
            }
        },
        
        addStep: function(){
            step = MapableSteps([step]);
            this.steps.push(step);
        }
    };
    
    var controller = {
        loadRoute: function(){
            model.fetchPrimaryRoute();
            // Now the route is loaded in this._route
            this.numSteps = this._route.step_count;
            for(var i in this._route.route.legs){
                var leg = MapableLeg(this._route.route.legs[i]);
                leg.init();
                this.legs.push(leg);
                console.log(leg)
            }

        }
    };
    
    var view = {
        container: $("#container"),
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
            
            controller.loadRoute();
            view.init();
            bindEvents();
            
        },
        
        model: model,
        view: view,
        controller: controller
        
            
    
    } 
});