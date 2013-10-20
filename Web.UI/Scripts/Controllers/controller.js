(function () {
    var module = angular.module("restaurantSearchApp", ["AngularGM", "ui.bootstrap", "filters"]);
}());

angular.module('filters', []).
    filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});


function CuisineTypeaheadCtrl($scope) {
    $scope.restaurantdata = [
        {
            name: "Jamies Italian",
            cuisine: "Italian",
            location: "London",
            image: "https://s3.amazonaws.com/distilleryimage9/f6b46228e17811e195e3123138048d2c_6.jpg"
        },
        {
            name: "Raj",
            cuisine: "Indian",
            location: "London",
            image: "https://s3.amazonaws.com/distilleryimage0/729e337affbd11e193de22000a1c8656_6.jpg"
        },
        {
            name: "Bella",
            cuisine: "Italian",
            location: "London",
            image: "https://s3.amazonaws.com/distilleryimage0/c2f5a7be897e11e180d51231380fcd7e_6.jpg"
        },
        {
            name: "Mango Tree",
            cuisine: "Indian",
            location: "Durham",
            image: "https://s3.amazonaws.com/distilleryimage2/6dde8aae149111e2b62322000a1e8a75_6.jpg"
        }
    ];
    

    
    $scope.search = function (item) {
        if (item.cuisine.indexOf($scope.selected.cuisine) != -1 || item.location.indexOf($scope.selected.location) != -1) {
            return true;
        }
        return false;
    };
}


function MapDisplayCtrl($scope) {

    $scope.options = {
        map: {
            zoom:16,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
    };

    var latLongCoords = new google.maps.LatLng(43, -73);

    $scope.geolocationAvailable = navigator.geolocation ? true : false;

    if ($scope.geolocationAvailable) {

        navigator.geolocation.getCurrentPosition(function(position) {
            latLongCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.center = latLongCoords;

            $scope.options = {
                map: {
                    center: latLongCoords,
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                },
                currentlocation: {
                    icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
                }
            };
            $scope.currentlocation = [
                {
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }];

            $scope.zoom = 10;
            $scope.$apply();

        }, function() {

        });
    }

    $scope.getCurrentLocation = function(currentlocation) {
        return angular.extend(
            $scope.options.currentlocation
        );
    };

}
