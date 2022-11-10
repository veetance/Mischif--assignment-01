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
    var clonebkg = $(this).clone();
    $(".canvas-wrapper").append(clonebkg);
    if ($(".canvas-wrapper").children().length > 1) {
      $(".canvas-wrapper").children().first().remove();
    }
    clonebkg.removeClass("thumbnail");
  });
});




// a free prespective transform function that warps image with 4 points jquery ui draggable


var container = $("#container");
var img = $(".img");
var pts = $(".pt");
var IMG_WIDTH = 200;
var IMG_HEIGHT = 200;


var transform = new PerspectiveTransform(img[0], IMG_WIDTH, IMG_HEIGHT, true);
var tl = pts.filter(".tl").css({
    left : transform.topLeft.x,
    top : transform.topLeft.y
});
var tr = pts.filter(".tr").css({
    left : transform.topRight.x,
    top : transform.topRight.y
});
var bl = pts.filter(".bl").css({
    left : transform.bottomLeft.x,
    top : transform.bottomLeft.y
});
var br = pts.filter(".br").css({
    left : transform.bottomRight.x,
    top : transform.bottomRight.y
});
var target;
var targetPoint;

function onMouseMove(e) {
    targetPoint.x = e.pageX - container.offset().left - 20;
    targetPoint.y = e.pageY - container.offset().top - 20;
    target.css({
        left : targetPoint.x,
        top : targetPoint.y
    });
    
    // check the polygon error, if it's 0, which mean there is no error
    if(transform.checkError()==0){
        transform.update();
        img.show();
    }else{
        img.hide();
    }
}

//interaction 

pts.mousedown(function(e) {
    target = $(this);
    targetPoint = target.hasClass("tl") ? transform.topLeft : target.hasClass("tr") ? transform.topRight : target.hasClass("bl") ? transform.bottomLeft : transform.bottomRight;
    onMouseMove.apply(this, Array.prototype.slice.call(arguments));
    $(window).mousemove(onMouseMove);
    $(window).mouseup(function() {
        $(window).unbind('mousemove', onMouseMove);
    })
});




  












































































































    

































  














































