var app = new Framework7({
  // App root element
  el: '#app',
  // other parameters

  routes: [

    {
      path: '/' ,
      url: 'index.html' ,
    },
    
    {
      path: '/page3/',
      url: 'pages/page3.html',
    },

  ],

});

var mainView = app.views.create('.view-main')




