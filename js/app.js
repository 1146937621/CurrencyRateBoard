var app = angular.module('app', []);

app.controller('main', ['$scope', '$http', function($scope, $http) {

    // currencies in the dropdown
    $scope.currencies = [];

    // rate displayed in the table
    $scope.rates = [];

    /* set the currency array (used as the source for the dropdown) */
    $scope.setCurrencyList = function() {

        $http.get("http://api.fixer.io/latest?base=USD").then(function(response) {
            var rawRates = response.data.rates;

            // create the currency array and push USD (used to get other currency names from fixer)
            $scope.currencies = Array();
            $scope.currencies.push("US Dollar - USD");

            // for each symbol returned, attempt to get the name and add it to the currency array 
            // (source for the dropdown)
            for (var symbol in rawRates) {
              if (rawRates.hasOwnProperty(symbol)) {
                var currency_name = $scope.getCurrencyName(symbol);
                if(currency_name != null) {
                    $scope.currencies.push(currency_name + " - " + symbol);
                }
                else {
                    $scope.currencies.push(symbol);
                }
              }
            }
        });
    };
    
    /* attempt to get the symbol name */
    $scope.getCurrencyName = function(symbol) {
        var symbol_name_dict = Array(
            {symbol: "AUD", name: "Australian Dollar"}, 
            {symbol: "BGN", name: "Bulgarian Lev"},
            {symbol: "BRL", name: "Brazilian Real"},
            {symbol: "CAD", name: "Canadian Dollar"},
            {symbol: "CHF", name: "Swiss Franc"},
            {symbol: "CNY", name: "Chinese Yuan"},
            {symbol: "CZK", name: "Czech Republic Koruna"},
            {symbol: "DKK", name: "Danish Krone"},
            {symbol: "GBP", name: "British Pound"}, 
            {symbol: "HKD", name: "Hong Kong Dollar"}, 
            {symbol: "HRK", name: "Croatian Kuna "},
            {symbol: "HUF", name: "Hungarian Forint"}, 
            {symbol: "ILS", name: "Israeli New Sheqel"},
            {symbol: "IDR", name: "Indonesian Rupiah"}, 
            {symbol: "INR", name: "Indian Rupee"},
            {symbol: "JPY", name: "Japanese Yen"}, 
            {symbol: "KRW", name: "South Korean Won"},
            {symbol: "MXN", name: "Mexican Peso"}, 
            {symbol: "MYR", name: "Malaysian Ringgit"},
            {symbol: "NOK", name: "Norwegian Krone"},
            {symbol: "NZD", name: "New Zealand Dollar"},
            {symbol: "PHP", name: "Philipine Peso"},
            {symbol: "PLN", name: "Polish Zloty"},
            {symbol: "RON", name: "Romanian Leu"},
            {symbol: "RUB", name: "Russian Ruble"},
            {symbol: "SEK", name: "Swedish Krona"},
            {symbol: "SGD", name: "Singapore Dollar"},
            {symbol: "THB", name: "Thai Baht"},
            {symbol: "TRY", name: "Turkish Lira"},
            {symbol: "USD", name: "US Dollar"},
            {symbol: "ZAR", name: "South African Rand"},
            {symbol: "EUR", name: "Euro"}
        );
    
        for(var i = 0; i < symbol_name_dict.length; i++) {
            if(symbol_name_dict[i].symbol == symbol) {
                return symbol_name_dict[i].name;
            }
        }

        // reached here -> so symbol not in dictionary
        return null;
        
    };

    /* Get the rates given the baseCurrency (rates array used by the currency table) */
    $scope.setRates = function(baseCurrency) {

        var currencySymbol = "";

        if(baseCurrency.split(" - ").length > 1) {
            currencySymbol = baseCurrency.split(" - ")[1];
        }
        else {
            currencySymbol = baseCurrency;
        }
        

        $http.get("http://api.fixer.io/latest?base=" + String(currencySymbol)).then(function(response) {
            var rawRates = response.data.rates;

            $scope.rates = Array();

            for (var symbol in rawRates) {
              if (rawRates.hasOwnProperty(symbol)) {
                var newRate = {};

                var currency_name = $scope.getCurrencyName(symbol);
                if(currency_name != null) {
                    newRate.name = currency_name;
                }
                else {
                    newRate.name = "";
                }

                newRate.symbol = symbol;
                newRate.value = rawRates[symbol];
                $scope.rates.push(newRate);
              }
            }
        });
    };

    /* Handler for selecting a new currency to convert from the dropdown */
    $scope.$watch('baseSelection', function(newVal, oldVal) {
        if (typeof newVal != 'undefined') {
            $scope.setRates(newVal);
        }
    });
}]);
