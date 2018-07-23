module.exports = function(app){

  app.component('myTabs', {
    transclude: true,
    controller: function MyTabsController() {
      var panes = this.panes = [];
      this.select = function (pane) {
        angular.forEach(panes, function (pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };
      this.addPane = function (pane) {
        if (panes.length === 0) {
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