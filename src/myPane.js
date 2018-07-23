module.exports = function (app) {
  app.component('myPane', {
    transclude: true,
    require: {
      tabsCtrl: '^myTabs',
    },
    bindings: {
      title: '@'
    },
    controller: function () {
      this.$onInit = function () {
        this.tabsCtrl.addPane(this);
        console.log(this);
      };
    },
    template: '<div class="tab-pane" ng-show="$ctrl.selected" ng-transclude></div>'
  });
};