
angular.module('hadron-disqus', ['ui.router', 'hadronAdmin.utils', 'ui.bootstrap', 'ui.bootstrap.tooltip',
    'ui.validate'])
  
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('disqusSettings', {
        url: "/settings/disqus",
        templateUrl: "templates/admin/disqusSettings",
        controller: 'disqusSettingsCtrl',
        title: "Disqus settings",
        resolve: {
          settings: ['$http', function($http){
            return $http.get('api/settings').then(function(data) {
              return data.data;
            });
          }]
        }
      })
  }])
  
  .controller('disqusSettingsCtrl', ['$scope', '$http', 'notifyUser', 'settings', '$q',
    function($scope, $http, notifyUser, settings, $q) {
      $scope.settings = settings || {};

      $scope.save = function(settings, invalid) {
        if(invalid) {
          notifyUser({text: "Please review the data in the form", type:'error'});
          return $q.reject();
        }

        var data = {
          disqus: settings.disqus
        };
        return $http.put('api/settings', data).success(function(data) {
          notifyUser({text: "Settings successfully saved", type:'success'});
          return data;
        });
      };
    }
  ]);