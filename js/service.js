(function () {
    var app = angular.module("productsTask");

    app.factory('productsService', ['$http', function ($http) {
        var productsInfo = {
            getProducts: getProducts
        };
        return productsInfo;

        function getProducts() {
            return $http.get('/products.json');
        }
    }]);
})();