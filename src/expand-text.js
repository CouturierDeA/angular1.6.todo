module.exports = function (app) {

  app.component('expandText', {
    transclude: true,
    templateUrl: 'public/templates/expand-text.html',
    bindings: {
      'text': '<?'
    },

    controller: function ModalController($scope, $rootScope) {
      var vm = this;
      vm.expanded = false;
      vm.$onInit = function(){
        console.warn('expandText')
      }
    }
  });
};