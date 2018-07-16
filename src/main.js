var angular  = require('angular');

var app = angular
.module('todoApp', []);

app.component('app', {
  templateUrl: 'public/templates/app.html',
  controllerAs: 'vm'
});

app.filter('defaultVal', function () {
  return function (val) {
    return (val) ? val : '-'
  }
});

app.service('mainSvc', function ($http) {
  this.genders = ['Male', 'Female'];
  this.putPerson = function (person) {
    return $http.put('/putPerson', {person: person});
  };
  this.deletePerson = function (id) {
    return $http.put('/deletePerson', {id: id});
  };
  this.getPersons = function () {
    return $http.get('/getPersons');
  }
});

var Person = function () {
  return {
    firstName: null,
    lastName: null,
    age: null,
    gender: null
  }

};

app.component('persons', {
  // template: require('src/templates/persons.html'),
  templateUrl: 'public/templates/persons.html',
  controller: function (mainSvc, $scope) {
    var vm = this;
    this.loading = false;
    this.number = 5;
    this.sort = '';
    this.sortOrder = '';
    this.sortKey = '';
    this.genders = mainSvc.genders;
    this.person = null;
    this.persons = [];
    this.modalOpen = false;
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
      // console.log($scope.myForm);

      if ($scope.myForm.$invalid) {
        this.errorsVisible = true;
        $scope.myForm.firstName.$pristine = false;
        $scope.myForm.lastName.$pristine = false;
        $scope.myForm.age.$pristine = false;
        $scope.myForm.gender.$pristine = false;
        return;
      }
      this.loading = true;
      mainSvc.putPerson(this.person).then(function (res) {
        vm.persons = res.data;
        vm.closeModal();
        vm.loading = false;

      }.bind(this)).catch(function (error) {
        this.loading = false;
      }.bind(this))

    }.bind(this);

    this.deletePerson = function (id) {
      this.loading = true;
      mainSvc.deletePerson(id).then(function (res) {
        if (res.data) {
          vm.persons = res.data;
          vm.closeModal();
        }
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

    }.bind(this);

    this.$onInit = function () {
      mainSvc.getPersons().then(function (res) {
        this.persons = res.data;
      }.bind(this))

    }.bind(this)
  },
  controllerAs: 'vm'
});