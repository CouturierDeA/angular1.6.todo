module.exports = function(app){

  app.component('myTabs', {
    transclude: true,
    bindings: {
      activeTab: '=',
      tabsId: '@',
      onTabChange: '<?'
    },
    controller: function MyTabsController($rootScope, $scope) {
      var panes = this.panes = [];
      var ctrl = this;
      this.select = function (pane) {
        if(typeof ctrl.onTabChange === 'function'){
          ctrl.onTabChange(pane.name)
        }else{
          ctrl.activeTab = pane.name;
          $scope.$emit('tab-change', {
            tabsId: ctrl.tabsId,
            activeTab: ctrl.activeTab
          });
        }
      };
      this.addPane = function (pane) {
        if (panes.length === 0 && !ctrl.activeTab) {
          this.select(pane);
        }
        panes.push(pane);
      };
    },
    template: '<div class="tabbable">\n' +
    '   <ul class="nav nav-tabs">\n' +
    '      <li ng-repeat="pane in $ctrl.panes" ng-class="{active:pane.selected}">\n' +
    '         <a href="" ng-click="$ctrl.select(pane)">{{pane.title}}</a>\n' +
    '      </li>\n' +
    '   </ul>\n' +
    '   <div class="tab-content" ng-transclude></div>\n' +
    '</div>'
  });
};