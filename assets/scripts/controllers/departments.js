'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */

angular.module('heidaApp')
  .controller('DepartmentCtrl', function($scope, $position, Restangular, $stateParams, $state) {
    Restangular.all('/api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });
    $scope.delete = function(department) {
      department.remove();
      $state.reload();
      $state.go($state.current, $stateParams, {
        reload: true,
        inherit: false
      });
    }
  }).controller('DepartmentEditCtrl', function($scope, $position, Restangular, $stateParams, $state) {
    Restangular.one('/api/department', $stateParams.id).get().then(function(department) {
      $scope.department = department;
    });
    $scope.update = function() {
      $scope.department.save();
      $state.go('dashboard.departments', $stateParams, {
        reload: true,
        inherit: false
      });
    }
  }).controller('DepartmentNewCtrl', function($scope, $position, Restangular, $stateParams, $state) {
    Restangular.all('/api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });
    $scope.save = function(department) {
      console.log(department);
      $scope.departments.post(department);
      $state.go('dashboard.departments', $stateParams, {
        reload: true,
        inherit: false
      });
    }
  });
