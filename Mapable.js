var Mapable = {
    
    _origin: undefined,
    _destination: undefined,
    _origin_loc: undefined,
    _destination_loc: undefined,
    _map: undefined,
    
    init: function(origin, destination){
        this._origin = origin;
        this._destination = destination;
        this.getOriginGeo().then(this.getDestGeo()).then(this.createAndCenterMapOnOrigin())
        
    },
    
    createAndCenterMapOnOrigin: function(){
        
                q=Q.defer();
                console.log(this)
//                this._map = new GMaps({
//                  div: '#map',
//                  lat: this._origin_loc.lat,
//                  lng: this._origin_loc.lng,
//                });
                q.resolve();
                
    },
    
    getOriginGeo: function(){
                q = Q.defer();
                var self = this;
                GMaps.geocode({
                    "address" : this._origin,
                    "callback" : function(result, status){
                            if(status == "OK"){
                                self._origin_loc={
                                    lat: result[0].geometry.location.k,
                                    lng: result[0].geometry.location.D
                                }
                                q.resolve()
                            }
                            else
                                q.reject(status);
                            }         
                });
        
                return q.promise;
    },
        
        
    getDestGeo: function(){
                q = Q.defer();
                var self = this;
                GMaps.geocode({
                    "address" : this._destination,
                    "callback" : function(result, status){
                            
                            if(status == "OK"){
                                 self._destination_loc={
                                    lat: result[0].geometry.location.k,
                                    lng: result[0].geometry.location.D
                                }
                                q.resolve()
                            }
                            else
                                q.reject(status)
                            }         
                });
                return q.promise;
    },
        
    

}