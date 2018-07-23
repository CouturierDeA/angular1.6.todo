module.exports = function (app) {
  app.component('personsForm', {
    templateUrl: 'public/templates/personsForm.html',
    bindings: {
      'person': '=',
      'modalOpen': '='
    },
    transclude: true,
    controllerAs: 'vm',
    controller: function (mainSvc, $scope, $rootScope) {
      this.genders = mainSvc.genders;
      this.errorsVisible = false;
      var vm = this;

      this.clearForm = function () {
        this.errorsVisible = false;
        $scope.myForm.firstName.$pristine = true;
        $scope.myForm.lastName.$pristine = true;
        $scope.myForm.age.$pristine = true;
        $scope.myForm.gender.$pristine = true;
      }.bind(this);

      this.onFormSubmit = function () {
        if ($scope.myForm.$invalid) {
          this.errorsVisible = true;
          $scope.myForm.firstName.$pristine = false;
          $scope.myForm.lastName.$pristine = false;
          $scope.myForm.age.$pristine = false;
          $scope.myForm.gender.$pristine = false;
          return;
        }
        $rootScope.$emit('on-person-form-valid', $scope.myForm.$invalid)
      }.bind(this);

      this.$onInit = function () {
        $scope.$watch('vm.modalOpen', function (val) {
          if(val){
            vm.clearForm()
          }
        });
        $rootScope.$on('on-modal-submit', vm.onFormSubmit)
      }.bind(this);

      this.$onDestroy = function () {
        $rootScope.$off('on-modal-submit', vm.onFormSubmit)
      }.bind(this)
    }

  });
};