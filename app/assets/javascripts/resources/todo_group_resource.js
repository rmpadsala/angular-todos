// Restangular service that uses setFullResponse
app.factory('GroupsResource', function(Restangular) {
  return Restangular.withConfig(function(RestangularProvider) {
    //RestangularConfigurer.setFullResponse(true);
    //RestangularProvider.setBaseUrl('todo_groups');
    RestangularProvider.setRequestSuffix('.json');
  });
});
