app.controller('TodosCtrl', ['$scope', function ($scope) {
    $scope.todos = [];

    var updateResource = function(index, todo) {
      $scope.todos[index].put();
    }

    $scope.visible = function() {
      return $scope.groups.length > 0;
    }

    $scope.toggleComplete = function(index, todo) {
      todo.complete = !todo.complete;
      updateResource(index, todo);
    };

    $scope.editTodo = function(e, index, todo) {
      e.preventDefault();
      todo.editable = false;
      updateResource(index, todo);
    };

    $scope.addTodo = function(e) {
      e.preventDefault();
      console.log($scope.nextTodo);
      $scope.nextTodo.complete = false;
      $scope.currentGroup.post('todos', $scope.nextTodo).then(function(result) {
        $scope.todos.unshift(result);
        $scope.nextTodo.title = "";
      });
    };

    $scope.removeTodo = function(e, index, todo) {
      e.preventDefault();
      $scope.todos[index].remove().then(function(success) {
        $scope.todos.splice(index, 1);
      });
    };

    $scope.toggleEditable = function(e, todo) {
      e.preventDefault();
      todo.editable = !todo.editable;
    };

    $scope.$watch('currentGroup', function(current, prev) {
      // console.log("Current group changed");
      if (current != prev) {
        $scope.currentGroup.getList("todos").then(function(todos) {
         // console.log(todos);
         $scope.todos = todos;
        });
      }
    }, true);

}]);
