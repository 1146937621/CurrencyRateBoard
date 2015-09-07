var app = angular.module('app', []);

app.controller('main', ['$scope',function($scope) {
  $scope.currencies = ["USD", "JPY", "EUR"];
  $scope.rates = [{name: "Japenese Yen", symbol: "JPY", value: 122}, {name: "Euro", symbol: "EUR", value: 0.89}, {name: "Japenese Yen", symbol: "JPY", value: 122}, {name: "Japenese Yen", symbol: "JPY", value: 122}];
}]);