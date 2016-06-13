var app = angular.module('productsTask');

app.controller('productsCtrl', function($scope, $uibModal, productsService) {
    productsService.getProducts()
        .success(function (response) {
            $scope.products = response;
            
            $scope.products.forEach(function(item, i, arr) {
                item.minPrice = Math.min.apply(Math, item.prices.map(function(o){return o.value;}));
            });
        })
        .error(function(reject){
            console.log(reject);
        });
});