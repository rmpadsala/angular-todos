app.controller('GroupsCtrl', ['$scope', 'TodoGroupResource', 'GroupsResource',
  function($scope, TodoGroupResource, GroupsResource) {

    $scope.groups = [];
    // This will query /todo_groups and return a promise.
    GroupsResource.all('todo_groups').getList().then(function(todoGroups) {
      $scope.groups = todoGroups;
      $scope.currentGroup = $scope.groups[0];
    });

    $scope.addGroup = function(e) {
      e.preventDefault();
      var groupToAdd = { name: $scope.nextGroup }
      GroupsResource.all('todo_groups').post(groupToAdd).then(function(result) {
        $scope.groups.push(result);
      });
      $scope.nextGroup = "";
    };

    $scope.setCurrentGroup = function(e, group) {
      e.preventDefault();
      $scope.currentGroup = group;
    };
}]);
