var angular = require('angular');

var app = angular
.module('todoApp', []);

app.component('app', {
  templateUrl: 'public/templates/app.html',
  // controllerAs: 'vm',
  controller: function(){
    this.hello = 'Hello from app ctrl';
  }
});

app.filter('defaultVal', function () {
  return function (val) {
    return (val) ? val : '-'
  }
});


app.filter('truncate', function () {
  return function (val, lng) {
    return (typeof val === 'string' && val.length >= lng || 20) ? val.substring(0, lng || 20) + '...' : val;
  }
});

app.controller('mainCtrl', function () {
  this.persons = ['Male', 'Female'];
  this.hello = 'Hello from mainCtrl';
});

app.service('mainSvc', function ($http) {
  var vm = this;
  this.genders = ['Male', 'Female'];
  this.persons = [];
  this.modalOpen = false;

  this.putPerson = function (person) {
    return $http.put('/putPerson', {person: person}).then(function (res) {
      vm.persons = res.data;
      return res.data;
    });
  };
  this.deletePerson = function (id) {
    return $http.put('/deletePerson', {id: id}).then(function (res) {
      vm.persons = res.data;
      return res.data;
    });
  };
  this.getPersons = function () {
    return $http.get('/getPersons').then(function (res) {
      vm.persons = res.data;
      return res.data;
    });
  }
});

require('./persons')(app);
require('./personsForm')(app);
require('./modal')(app);
require('./showLargeText')(app);
require('./myTabs')(app);
require('./myPane')(app);