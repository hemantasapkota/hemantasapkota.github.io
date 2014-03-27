
angular.module('hadron-googleanalytics', ['ui.router', 'hadronAdmin.utils', 'ui.bootstrap', 'ui.bootstrap.tooltip',
    'ui.validate'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('GASettings', {
        url: "/settings/googleanalytics",
        templateUrl: "templates/admin/GASettings",
        controller: 'GASettingsCtrl',
        title: "Google Analytics settings",
        resolve: {
          settings: ['$http', function($http){
            return $http.get('api/settings').then(function(data) {
              return data.data;
            });
          }]
        }
      })
  }])

  .controller('GASettingsCtrl', ['$scope', '$http', 'notifyUser', 'settings', '$q',
    function($scope, $http, notifyUser, settings, $q) {
      $scope.settings = settings || {};

      $scope.save = function(settings, invalid) {
        if(invalid) {
          notifyUser({text: "Please review the data in the form", type:'error'});
          return $q.reject();
        }

        var data = {
          googleanalytics: settings.googleanalytics
        };
        return $http.put('api/settings', data).success(function(data) {
          notifyUser({text: "Settings successfully saved", type:'success'});
          return data;
        });
      };
    }
  ]);