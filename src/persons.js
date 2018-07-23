var Person = function () {
  return {
    firstName: null,
    lastName: null,
    age: null,
    gender: null
  }
};
module.exports = function (app) {
  app.component('persons', {
    // template: require('src/templates/persons.html'),
    templateUrl: 'public/templates/persons.html',
    transclude: true,
    controller: function (mainSvc, $scope, $rootScope) {

      var vm = this;
      this.loading = false;
      this.mainSvc = mainSvc;
      this.forms = {};
      this.sort = '';
      this.sortOrder = '';
      this.sortKey = '';
      this.genders = mainSvc.genders;
      this.person = null;
      this.persons = [];
      this.modalOpen = false;
      vm.$scope = $scope;

      this.errorsVisible = false;


      this.sortPersons = function (key) {
        if (this.sortKey === key) {
          this.sortOrder = (this.sortOrder === '-') ? '' : '-';
        }
        this.sortKey = key;
        this.sort = this.sortOrder + this.sortKey

      }.bind(this);

      this.closeModal = function () {
        this.modalOpen = false;
        this.errorsVisible = false;
        $scope.myForm.firstName.$pristine = true;
        $scope.myForm.lastName.$pristine = true;
        $scope.myForm.age.$pristine = true;
        $scope.myForm.gender.$pristine = true;
      }.bind(this);

      this.editPersonSubmit = function () {
        vm.loading = true;
        mainSvc.putPerson(this.person).then(function (res) {
          vm.closeModal();
          vm.loading = false;

        }.bind(this)).catch(function (error) {
          this.loading = false;
        }.bind(this))

      }.bind(this);

      this.deletePerson = function (id) {
        this.loading = true;
        mainSvc.deletePerson(id).then(function (res) {

          vm.loading = false;

        }.bind(this)).catch(function (error) {
          this.loading = false;
        }.bind(this))

      }.bind(this);

      this.formCancel = function (event) {
        if (event && !event.target.classList.contains('modal')) {
          return
        }
        this.closeModal();
      }.bind(this);

      this.editPerson = function (person) {
        this.person = angular.copy(person);
        this.modalOpen = true
      }.bind(this);

      this.createPerson = function () {
        this.person = new Person();
        this.modalOpen = true
        console.warn(this.modalOpen)
      }.bind(this);

      this.$onInit = function () {
        $scope.$watch('vm.mainSvc.persons', function (newVal) {
          vm.persons = newVal
        });
        mainSvc.getPersons()
        $rootScope.$on('on-person-form-valid', function (val) {
          if (val) {
            vm.editPersonSubmit()
          }

        })

      }.bind(this)
      this.$onDestroy = function () {


      }.bind(this)
    },
    controllerAs: 'vm'
  });
};