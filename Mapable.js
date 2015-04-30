var Mapable = {
    
    _origin: undefined,
    _destination: undefined,
    _origin_loc: undefined,
    _destination_loc: undefined,
    _map: undefined,
    route: undefined,
    
    init: function(origin, destination){
        this._origin = origin;
        this._destination = destination;
        this._getOriginGeoCode().then(this._getDestGeoCode.bind(this)).then(this._createAndCenterMapOnOrigin.bind(this)).then(this.loadRoute.bind(this));
        
    },
    
    
    getMap: function(){
        return this._map;
    },
    
    
    
    // Private Functions 
    _getOriginGeoCode: function(){
                q = Q.defer();
                var self = this;
                GMaps.geocode({
                    "address" : this._origin,
                    "callback" : function(result, status){
                            if(status == "OK"){
                                self._origin_loc={
                                    lat: result[0].geometry.location.A,
                                    lng: result[0].geometry.location.F
                                }
                                q.resolve()
                            }
                            else
                                q.reject(status);
                            }         
                });
        
                return q.promise;
    },
        
        
    _getDestGeoCode: function(){
                q = Q.defer();
                var self = this;
                GMaps.geocode({
                    "address" : this._destination,
                    "callback" : function(result, status){
                            
                            if(status == "OK"){
                                 self._destination_loc={
                                    lat: result[0].geometry.location.A,
                                    lng: result[0].geometry.location.F
                                }
                                q.resolve()
                            }
                            else
                                q.reject(status)
                            }         
                });
                return q.promise;
    },
    
    _createAndCenterMapOnOrigin: function(){
        
                q=Q.defer();
                this._map = new GMaps({
                  div: '#map',
                  lat: this._origin_loc.lat,
                  lng: this._origin_loc.lng,
                });
                q.resolve();
                
    },
    
    loadRoute: function(){
        
        this.route = MapableRoute(this._map, this._origin, this._destination);
        this.route.init();
        
                
    }
        
    

}