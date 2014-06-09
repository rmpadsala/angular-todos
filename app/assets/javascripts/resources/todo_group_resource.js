app.factory('TodoGroupResource', ['$resource', function($resource) {
  return $resource("/todo_groups/:id.json", {id: '@id'},{
    udpate: {
      method: 'PUT'
    }
  });
}]);

// Restangular service that uses setFullResponse
app.factory('GroupsResource', function(Restangular) {
  return Restangular.withConfig(function(RestangularProvider) {
    // RestangularConfigurer.setFullResponse(true);
    //RestangularProvider.setBaseUrl('todo_groups');
    RestangularProvider.setRequestSuffix('.json');
  });
});
