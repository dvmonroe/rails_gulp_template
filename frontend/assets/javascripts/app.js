$(function() {
  App = new Mn.Application();
  App.Views = {};

  App.on("start", function(options){
    this.options.initPageLayout();
    this.body.show(new App.Views.HomePage());
  });

  App.options.initPageLayout = function(){
    App.header.show(new App.Views.HeaderLayout());
    App.footer.show(new App.Views.FooterLayout());
  };

  App.addRegions({
    header: ".js-header",
    body: ".js-body",
    footer: ".js-footer"
  });

  return App;
});

//= include /views/header.js
//= include /views/footer.js
//= include /views/index.js
