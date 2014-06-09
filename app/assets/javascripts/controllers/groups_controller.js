app.controller('GroupsCtrl', ['$scope', 'TodoGroupResource', 'Group', 'GroupsResource',
  function($scope, TodoGroupResource, Group, GroupsResource) {

    $scope.group = Group;
    // First way of creating a Restangular object. Just saying the base URL
    // var baseRoute = Restangular.all('todo_groups.json');

    // This will query /accounts and return a promise.
    GroupsResource.all('todo_groups').getList().then(function(todoGroups) {
      $scope.group.groups = todoGroups;

      var activeGroup = $scope.group.groups[0];
      console.log(activeGroup);
      activeGroup.getList("todos").then(function(todos) {
         // console.log(todos);
         $scope.activeGroupTodos = todos;
      });
    });
    //$scope.group.groups = TodoGroupResource.query();

    // Q: This did not work, not sure why first element is undefined
    // $scope.group.activeGroup = $scope.group.groups[0] || {};

    $scope.addGroup = function(e) {
      e.preventDefault();
      var groupToAdd = { name: $scope.nextGroup }
      // GroupsResource.post({groupToAdd}) // POST to /users
      GroupsResource.all('todo_groups').post(groupToAdd).then(function(result) {
        // console.log(result);
        $scope.group.groups.push(result);
      });
      $scope.nextGroup = "";
    };

    $scope.setCurrentGroup = function(e, group) {
      e.preventDefault();
      $scope.group.activeGroupId = group.id;
      group.getList("todos").then(function(todos) {
         console.log("Set current group todos");
         console.log(todos);
         $scope.activeGroupTodos = todos;
      });
    };
}]);
