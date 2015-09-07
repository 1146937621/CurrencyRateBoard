var app = angular.module('app', []);

app.controller('main', ['$scope', '$http', function($scope, $http) {
    $scope.currencies = ["USD", "JPY", "EUR"];
    $scope.rates = [{name: "Japenese Yen", symbol: "JPY", value: 122}, {name: "Euro", symbol: "EUR", value: 0.89}, {name: "Japenese Yen", symbol: "JPY", value: 122}, {name: "Japenese Yen", symbol: "JPY", value: 122}];
    
    $scope.getCurrencyName = function(symbol) {
        var symbol_name_dict = Array({symbol: "BGN", name: "Bulgarian Lev"},{symbol: "BRL", name: "Brazilian Real"},{symbol: "CAD", name: "Canadian Dollar"},{symbol: "CHF", name: "Swiss Franc"});
        for(var i = 0; i < symbol_name_dict.length; i++) {
            if(symbol_name_dict[i].symbol == symbol) {
                return symbol_name_dict[i].name;
            }
        }
    };

    $scope.getRates = function(baseCurrency) {
        $http.get("http://api.fixer.io/latest?base=" + String(baseCurrency)).then(function(response) {
            var rawRates = response.data.rates;
            $scope.rates = Array();

            console.log(rawRates);
            for (var symbol in rawRates) {
              if (rawRates.hasOwnProperty(symbol)) {
                var newRate = {};
                newRate.name = $scope.getCurrencyName(symbol);
                newRate.symbol = symbol;
                newRate.value = rawRates[symbol];
                $scope.rates.push(newRate);
              }
            }   
        });
    }; 
}]);

