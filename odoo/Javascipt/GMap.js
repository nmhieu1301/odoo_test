/// <reference path="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false" />
/// <reference path="jquery.min.js" />
var infoWindows = [];
var GMap = {
    map: null,
    create: function (elementId, mapOptions) {
        var center = new google.maps.LatLng(15.8063097, 106.6883665);
        var options = {
            zoom: 15,
            maxZoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center
        };
        $.extend(true, options, mapOptions);
        this.map = new google.maps.Map(document.getElementById(elementId), options);
    }
}

GMap.Polylines = {
    polylines: [],
    clear: function () {
        for (var i = 0; i < this.polylines.length; i++) {
            this.polylines[i].setMap(null);
        }
        this.polylines = [];
    },
    add: function (arrs) {
        var option = {
            strokeColor: GMap.Polylines.random_hex_color()
        };
        var polyline = new google.maps.Polyline(option);
        polyline.setPath(arrs);
        polyline.setMap(GMap.map);
        this.polylines.push(polyline);
    },
    __draw: function () {
        for (var i = 0; i < this.polylines.length; i++) {
            this.polylines[i].setMap(GMap.map);
        }
    },
    random_hex_color: function () {
        /* get random red, green, and blue from 0 to 255 */
        var randomred = Math.floor(Math.random() * 255);
        var randomgreen = Math.floor(Math.random() * 255);
        var randomblue = Math.floor(Math.random() * 255);

        /* convert each decimal number to hexadecimal */
        var hred = new String(randomred.toString(16));
        var hgreen = new String(randomgreen.toString(16));
        var hblue = new String(randomblue.toString(16));

        /* pad with 0 if necessary 
            (e.g. make sure to output 05 instead of just 5) */
        hred = String('00' + hred).slice(-2);
        hgreen = String('00' + hgreen).slice(-2);
        hblue = String('00' + hblue).slice(-2);

        return '#' + hred + hgreen + hblue;
    }
};

GMap.Markers = {
    markers: [],
    clear: function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].marker.setMap(null);
        }
        this.markers = [];
    },
    add: function (key, lat, lng, title, content,_linkicon) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            title: title,
            map: GMap.map,
            maxZoom:18,
            //icon: '../Images/ic-point-co1.png'
            icon: _linkicon
        });
        var winInfo = new google.maps.InfoWindow({
            content: content
        });

        var obj = new Object();
        obj.marker = marker;
        obj.key = key;
        obj.InfoWindow = winInfo;
        this.markers.push(obj);
        infoWindows.push(winInfo);
        GMap.map.setZoom(15);

        google.maps.event.addListener(marker, 'click', function () {
            closeAllInfoWindows();
            winInfo.open(GMap.map, marker);
            GMap.map.panTo(marker.getPosition());
            //GMap.map.setZoom(15);
        });
    },
    panTo: function (key) {
        for (var i = 0; i < this.markers.length; i++) {
            var item = this.markers[i];
            if (item.key == key) {
                item.marker.setMap(GMap.map);
                item.InfoWindow.open(GMap.map, item.marker);
                GMap.map.panTo(item.marker.getPosition());
                GMap.map.setZoom(15);
            }
            else {
                item.InfoWindow.close();
            }
        }
    },
    hide: function () {
        for (var i = 0; i < this.markers.length; i++) {
            var item = this.markers[i];
            item.marker.setMap(null);
        }
    },
    show: function () {
        for (var i = 0; i < this.markers.length; i++) {
            var item = this.markers[i];
            item.marker.setMap(GMap.map);
        }
    }
};

function closeAllInfoWindows() {
    for (var i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
    }
}

GMap.Directions = {
    data: [],
    status: false,
    item: null,
    distance: 0,
    clear: function () {
        this.status = false;
        this.distance = 0;
        this.data = [];
    },
    __route: function () {
        if (this.status)
            return;
        if (this.data.length == 0)
            return;
        this.status = true;
        this.item = null;
        this.item = this.data.pop();
        if (this.item !== undefined && this.item.latOrigin !== undefined
            && this.item.lngOrigin !== undefined
            && this.item.latDestination !== undefined
            && this.item.lngDestination !== undefined) {
            try {
                $.ajax('../directions/submitdirection.ashx', {
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        origin: GMap.Directions.item.latOrigin + ',' + GMap.Directions.item.lngOrigin,
                        destination: GMap.Directions.item.latDestination + ',' + GMap.Directions.item.lngDestination,
                        originShop: GMap.Directions.item.shopOrigin,
                        destinationShop: GMap.Directions.item.shopDestination
                    },
                    success: function (response) {
                        if (response.status == 'OK') {
                            var route = response.routes[0];
                            try {
                                var attr = google.maps.geometry.encoding.decodePath(route.overview_polyline.points);
                                GMap.Polylines.add(attr);
                            } catch (e) {

                            }
                            var directions_panel = $('#directions_panel');
                            $('<div style="background:yellow; padding:4px;cursor: pointer;font-weight: 600;" onclick="GMap.Markers.panTo(\'' + GMap.Directions.item.shopOrigin + '\')"/>').text('FROM: ' + GMap.Directions.item.shopOrigin + '  TO: ' + GMap.Directions.item.shopDestination).appendTo(directions_panel);
                            for (var i = 0; i < route.legs.length; i++) {
                                GMap.Directions.distance += route.legs[i].distance.value;
                                $('#txt_total').text(GMap.Directions.distance + ' m ~ ' + parseFloat(GMap.Directions.distance) / 1000 + ' km');
                                $('<div style="background:yellow; padding:4px"/>').text('Distance: ' + route.legs[i].distance.text + '    Duration: ' + route.legs[i].duration.text).appendTo(directions_panel);
                                $('<div style="padding:4px"/>').text('START: ' + route.legs[i].start_address).appendTo(directions_panel);
                                //for (var j = 0; j < route.legs[i].steps.length; j++) {
                                //}
                                $('<div style="padding:4px"/>').text('TO: ' + route.legs[i].end_address).appendTo(directions_panel);
                                $('<br/>').appendTo(directions_panel);
                            }
                        }
                    },
                    complete: function (response, textStatus) {
                        GMap.Directions.status = false;
                        GMap.Directions.__route();
                    }
                });

            } catch (e) {

            }
        }
        else {
            GMap.Directions.status = false;
            GMap.Directions.__route();
        }
    },
    route: function (origin, fromLat, fromLng, destination, toLat, toLng) {
        this.data.push({
            shopOrigin: origin,
            shopDestination: destination,
            latOrigin: fromLat,
            lngOrigin: fromLng,
            latDestination: toLat,
            lngDestination: toLng
        });
        //this.__route();
    }
};

var polyline_encoder = (function () {
    var _ = {};

    var invert_bits = function (str) {
        var ret = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == "1")
                ret += "0";
            else
                ret += "1";
        }
        return ret;
    };

    var get_binary = function (num) {
        var binary = parseInt(num).toString(2);
        var bit_difference = 32 - binary.length;
        for (var i = 0; i < bit_difference; i++)
            binary = "0" + binary;
        if (num < 0) {
            binary = invert_bits(binary);
            binary = parseInt(binary, 2);
            binary++;
            return parseInt(binary).toString(2);
        }
        return binary;
    };

    _.encode_polyline = function (points) {
        var ret = "";
        var last_point, val_1, val_2;
        for (var i = 0; i < points.length; i++) {
            if (!last_point) {
                val_1 = points[i][0];
                val_2 = points[i][1];
            } else {
                val_1 = points[i][0] - last_point[0];
                val_2 = points[i][1] - last_point[1];
            }
            last_point = points[i];
            ret += _.encode_polyline_value(val_1) + _.encode_polyline_value(val_2);
        }
        return ret;
    };

    _.encode_polyline_value = function (value) {
        var ret = "";
        value = Math.round(value * 100000);
        var shifted = value << 1;
        if (shifted < 0)
            shifted = ~shifted;
        var rem = shifted;
        while (rem >= 32) {
            ret += get_ascii_value(((0x20 | (rem & 0x1f)) + 63));
            rem >>= 5;
        }
        ret += get_ascii_value(rem + 63);
        return ret;
    };

    var get_ascii_value = function (num) {
        var ascii_table =
        // 0 thru 9
        "??????????" +
        // 10 thru 19
        "??????????" +
        // 20 thru 29
        "??????????" +
        // 30 thru 39
        "?? !\"#$%&'" +
        // 40 thru 49
        "()*+,-./01" +
        // 50 thru 59
        "23456789:;" +
        // 60 thru 69
        "<=>?@ABCDE" +
        // 70 thru 79
        "FGHIJKLMNO" +
        // 80 thru 89
        "PQRSTUVWXY" +
        // 90 thru 99
        "Z[\\]^_`abc" +
        // 100 thru 109
        "defghijklm" +
        // 110 thru 119
        "nopqrstuvw" +
        // 120 thru 127
        "xyz{|}~?";

        var value = ascii_table.substr(num, 1);
        if (value == "?")
            value = "";
        return value;
    };

    return _;
})();