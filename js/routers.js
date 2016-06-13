 var app = angular.module('routers', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls']);

 app.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
     .state('index', {
         url: "/products",
         templateUrl: "products-list.html",
         controller: "productsCtrl"
     })
     .state('product-details', {
         url: "/product",
         templateUrl: "product-details.html",
         controller: "detailsController",
         params: {
           productDetails: null,
         }
      })
     .state("index.product-popup", {
        url: "/product-popup",
        template: '<div ui-view></div>',
        onEnter: showPopup,
        onReactivate: showPopup,
        params: {
           productDetails: null,
        }
     });

     $urlRouterProvider.otherwise("/products");
 });

function showPopup($stateParams, $state, $uibModal){
        $uibModal.open({
            template: modalTemplate,
            animation: true,
            backdrop: 'static',
            windowClass: 'product-dialog',
            resolve: {},
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
              $scope.product = $stateParams.productDetails;
              
              $uibModalInstance.result.finally(function() {
                $state.go('index');
              });

              $scope.close = function close(){
                $uibModalInstance.dismiss('close');
              }

              $scope.$on("$stateChangeStart", function(evt, toState) {
                if (!toState.$$state().includes['modal']) {
                  $uibModalInstance.dismiss('close');
                }
              });

            }]
        });
    }

var modalTemplate = `<div>
    <div class="modal-header">
        <h3 class="modal-title">
            Product details
        </h3>
    </div>
        <div class="modal-body">
          <h3>{{product.name}}</h3>
          <img ng-src="{{product.imgUrl}}" alt="{{product.name}}">
          <p>{{product.about}}</p>

          <div class="product-wrapper" ng-repeat="price in product.prices">
              <span class="bg-success">{{price.company}} - {{price.value | currency:"$":0}}</span>
          </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-warning" type="button" ng-click="close()">Close</button>
        </div>
</div>`;


/*
 app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode({
  		enabled: true,
  		requireBase: true
	});
}]);*/