var app = new Framework7({
  // App root element
  el: "#app",
  // other parameters

  routes: [
    {
      path: "/",
      url: "index.html",
    },

    {
      path: "/page3/",
      url: "pages/page3.html",
    },
  ],
});

var mainView = app.views.create(".view-main");




//  using jQuery create an array loop of 6 images from local folder and populate.background-wrapper with images that have a class of .background-thumbnail thumbnail
var bkgimages = [
  "../www/img/bkg-folder/bkg-01.png",
  "../www/img/bkg-folder/bkg-02.png",
  "../www/img/bkg-folder/bkg-03.png",
  "../www/img/bkg-folder/bkg-04.png",
  "../www/img/bkg-folder/bkg-05.png",
  "../www/img/bkg-folder/bkg-06.png", ];

  $(function() {
  for (var i = 0; i < bkgimages.length; i++) {
    var img = $('<img />', {
      src: bkgimages[i],
      class: "background-thumbnail thumbnail panel-close ",
      id: "bkg-" + i,
    });
    $(".background-wrapper").append(img);
  }
});




//event listner function that clones .background-thumbnail onclick and appends it to .canvas-wrapper if the .canvas-wrapper has more than 1 image then remove the first image in the .canvas-wrapper and remove .thumbnail class from cloned image
$(function() { 
  $(".background-wrapper").on("click", ".background-thumbnail", function() {
    var clone = $(this).clone();
    $(".canvas-wrapper").append(clone);
    if ($(".canvas-wrapper").children().length > 1) {
      $(".canvas-wrapper").children().first().remove();
    }
    clone.removeClass("thumbnail");
  });
});











































































































    

































  














































