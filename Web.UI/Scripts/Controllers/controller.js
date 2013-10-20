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
            latitude: "51.511181",
            longitude: "-0.062227",
            image: "https://s3.amazonaws.com/distilleryimage9/f6b46228e17811e195e3123138048d2c_6.jpg",
            resrating: 3
        },
        {
            name: "Raj",
            cuisine: "Indian",
            location: "London",
            latitude: "51.512677",
            longitude: "-0.088148",
            image: "https://s3.amazonaws.com/distilleryimage0/729e337affbd11e193de22000a1c8656_6.jpg",
            resrating: 3
        },
        {
            name: "Bella",
            cuisine: "Italian",
            location: "London",
            latitude: "51.493336",
            longitude: "-0.072699",
            image: "https://s3.amazonaws.com/distilleryimage0/c2f5a7be897e11e180d51231380fcd7e_6.jpg",
            resrating: 3
        },
        {
            name: "Mango Tree",
            cuisine: "Indian",
            location: "Durham",
            latitude: "54.771633",
            longitude: "-1.568298",
            image: "https://s3.amazonaws.com/distilleryimage2/6dde8aae149111e2b62322000a1e8a75_6.jpg",
            resrating: 3
        },
        {
            name: "Saigon Saigon",
            cuisine: "Vietnamese",
            location: "Liverpool",
            latitude: "51.511181",
            longitude: "-0.062227",
            image: "https://s3.amazonaws.com/distilleryimage9/4c93f00c40e511e2b41022000a9f1899_6.jpg",
            resrating: 3
        },
        {
            name: "Busaba Eathai",
            cuisine: "Thai",
            location: "London",
            latitude: "51.512677",
            longitude: "-0.088148",
            image: "https://s3.amazonaws.com/distilleryimage8/238928b2f95a11e1b65722000a1e9f8b_6.jpg",
            resrating: 3
        },
        {
            name: "Toms Kitchen",
            cuisine: "British",
            location: "Birmingham",
            latitude: "51.493336",
            longitude: "-0.072699",
            image: "https://s3.amazonaws.com/distilleryimage9/f994b0d4157011e28a2e22000a1ea02d_6.jpg",
            resrating: 3
        },
        {
            name: "Vapiano",
            cuisine: "Italian",
            location: "Durham",
            latitude: "54.771633",
            longitude: "-1.568298",
            image: "https://s3.amazonaws.com/distilleryimage9/b4ec5206c2e711e1be6a12313820455d_6.jpg",
            resrating: 3
        }
    ];

    $scope.maxrating = 5;
    $scope.isReadonly = true;
    $scope.rate = 4;
    
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

    $scope.onSelect = function($item, $model, $label) {
        latLongCoords = new google.maps.LatLng($item.latitude, $item.longitude);
        $scope.center = latLongCoords;
    };

}
