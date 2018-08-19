module.exports = function (app) {
  app.component('myPane', {
    transclude: true,
    require: {
      tabsCtrl: '^myTabs',
    },
    bindings: {
      title: '@',
      name: '@'
    },
    controller: function () {
      this.$onInit = function () {
        this.tabsCtrl.addPane(this);
        console.log(this);
      };
    },
    template: '<div class="tab-pane" ng-show="$ctrl.name == $ctrl.tabsCtrl.activeTab" ng-transclude></div>'
  });
};