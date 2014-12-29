var ComharNGApp = angular.module('ComharNGApp', ['comharControllers']);


ComharNGApp.directive('popoverClose', function() {
  return {
    link: function($scope, $element, $attrs) {
      $element.bind('click', function() {
        $element.parent().parent().popup('close');
      });
    }
  }
});

ComharNGApp.directive('jqueryCreate', function() {
 return {
   link: function($scope, $element, $attr) {
      $element.parent().trigger('create');
    }
  };
});