 (function () {
  var app = angular.module('myApp', ['ui.bootstrap', 'ngStorage', 'ngRoute', 'angular.filter','angularUtils.directives.dirPagination'])
    app.config(function($routeProvider){
      $routeProvider
      .when('/banks',{
        templateUrl: 'banks.html'
      })
    });
    app.controller('main', ['$scope', '$http', '$localStorage',
      function ($scope, $http) {


        $scope.showrecord = false;
          $scope.showrecord1 = false;
          $scope.viewby = '10';                            
          $scope.location = "DELHI";  
          $scope.showDetail = false;
          
        $scope.getBank = function (location) {
          $scope.showDetail = false;
          $scope.showrecord = false;
          $scope.showrecord1 = true;
          $scope.data = '';
          $scope.showdetails = false;
          $scope.arrayresult = [];
          
          
          $http.get('https://vast-shore-74260.herokuapp.com/banks?city=' + location, { cache: true })
          .then(function (response) {
            $scope.data = response.data;
            $scope.showrecord = true;
            $scope.showrecord1 = false;
            $scope.totalItems = $scope.data.length;
            $scope.selectLength = $scope.totalItems;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 4;
            $scope.setPage = function (pageNo) {
              $scope.currentPage = pageNo;
            };
            
            $scope.pageChanged = function () {
              console.log('Page changed to: ' + $scope.currentPage);
            };
            
            $scope.setItemsPerPage = function (num) {
              $scope.itemsPerPage = num;
              $scope.currentPage = 1;
            }
           
            
          });
        }
        $scope.getBankById = function(ifsc){
          $scope.showDetail = true;
         $scope.filteredBank =  $scope.data.filter(function(bank){
            return bank.ifsc == ifsc;
          })
        }
        $scope.markFavourite = function(ifsc){
          if(localStorage.getItem(''+ifsc) == 'Not Favourite'){
            localStorage.setItem(''+ifsc, 'Favourite' );
          }
          else if(localStorage.getItem(''+ifsc) == 'Favourite'){
            localStorage.setItem(''+ifsc, 'Not Favourite' );
          }
           
        }
        
        $scope.getFavourite = function(ifsc){

          if(!localStorage.getItem(''+ifsc))
          {
            localStorage.setItem(''+ifsc, 'Not Favourite' );
          }
          return localStorage.getItem(''+ifsc);
        }
        $scope.changePage = function(){
          $scope.selectLength = $scope.data.slice((($scope.currentPage-1)*$scope.itemsPerPage), (($scope.currentPage)*$scope.itemsPerPage)).length;
        }
        
        $scope.getBank("DELHI");
        
        
      }
    ]);
  }());  
