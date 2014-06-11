app.controller('TodosCtrl', ['$scope', 'TodoResource', 'Group',
  function ($scope, TodoResource, Group) {
    $scope.group = Group;
    $scope.activeGroupId = Group.activeGroupId;
    $scope.todos = [];

    var updateResource = function(todo) {
      console.log("Edit todo");
      console.log(todo);
      $scope.currentGroup.put('todos',todo).then(function(result) {
        todo = result;
      },
      function(failure) {
        console.log("failed " + failure.statusText);
      });
    }

    $scope.visible = function() {
      return $scope.groups.length > 0;
    }

    $scope.toggleComplete = function(todo) {
      todo.complete = !todo.complete;
      updateResource(todo);
    };

    $scope.editTodo = function(e, todo) {
      e.preventDefault();
      todo.editable = false;
      updateResource(todo);
    };

    $scope.addTodo = function(e) {
      e.preventDefault();
      console.log($scope.nextTodo);
      $scope.currentGroup.post('todos', $scope.nextTodo).then(function(result) {
        $scope.todos.unshift(result);
        $scope.nextTodo.title = "";
      });
    };

    $scope.removeTodo = function(e, index, todo) {
      e.preventDefault();
      $scope.currentGroup.remove('todos', todo.id).then(function(success) {
          if (success.$resolved) {
            $scope.todos.splice(index, 1);
          }
        },
        function(failure) {
          console.log("failed");
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
