var getTaxisCoordR = function (){
    var taxisCoord = [];
    for (var i = 0; i < TAXIS_COUNT; i++) {
        var coord = {};
        const LONG_MIN = -0.5;
        const LONG_MAX = 0.5;
        const LAT_MIN = 51.4;
        const LAT_MAX = 51.7;
        coord.longitude = Math.random() * (LONG_MAX - LONG_MIN) + LONG_MIN;
        coord.latitude = Math.random() * (LAT_MAX - LAT_MIN) + LAT_MIN;
        taxisCoord.push({ taxiID: i, coord: coord});
    };
    return taxisCoord;
};