module.exports = function (app) {

  app.component('modal', {
    transclude: true,
    templateUrl: 'public/templates/modal.html',
    controllerAs: 'vm',
    bindings: {
      'modalOpen': '=',
      'loading': '=',
      'submitDisabled': '='
    },

    controller: function ModalController($scope, $rootScope) {
      var vm = this;
      vm.formCancel = function (event) {
        if (event && event.keyCode && event.keyCode !== 27 || !event.target.classList.contains('modal-close')) {
          return
        }
        vm.modalOpen = false
      }.bind(this);
      // Todo: add auto focus when form is visible
      // this.$onInit = function(){
      //   $scope.$watch('vm.modalOpen', function (val) {
      //
      //   })
      // };

      vm.submit = function () {
        console.warn($scope)
        $rootScope.$emit('on-modal-submit')
      }
    }
  });
};