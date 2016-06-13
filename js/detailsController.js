var app = angular.module('productsTask');

app.controller('detailsController', function($scope, $uibModal, $stateParams) {
    $scope.product = $stateParams.productDetails;
});