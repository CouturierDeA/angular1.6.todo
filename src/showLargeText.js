var angular = require('angular');

module.exports = function (app) {

  app.component('showLargeText', {
    transclude: true,
    templateUrl: 'public/templates/showLargeText.html',
    bindings: {
      'text': '<?',
      maxLength: '<?',
      showText: '<?',
      hideText: '<?'
    },

    controller: function ModalController($scope, $rootScope,$element) {
      var vm = this;
      vm.$short;
      vm.$long;
      vm.shortHeight = 0;
      vm.longHeight = 0;
      vm.expanded = false;

      vm.handleResize = function(){
        vm.$short = $element[0].getElementsByClassName('expand-text--short')[0];
        vm.$long = $element[0].getElementsByClassName('expand-text--long')[0];
        vm.shortHeight = vm.$short.offsetHeight;
        vm.longHeight = vm.$long.offsetHeight;

        if(vm.shortHeight === vm.longHeight){
          vm.expanded = true;
        }
      };
      vm.$onInit = function(){
        setTimeout(vm.handleResize,0);
      };
      vm.$onDestroy = function(){
        window.removeEventListener('resize', vm.handleResize)
      }
    }
  });
};