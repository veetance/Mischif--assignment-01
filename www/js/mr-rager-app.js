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
  "img/bkg-folder/bkg-01.png",
  "img/bkg-folder/bkg-02.png",
  "img/bkg-folder/bkg-03.png",
  "img/bkg-folder/bkg-04.png",
  "img/bkg-folder/bkg-05.png",
  "img/bkg-folder/bkg-06.png", ];

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

var target;
var targetPoint;



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



// make sure the cuersor is below center of the point when dragging
function onDragMove(e) {
    targetPoint.x = e.pageX - container.offset().left - target.width() / .30;
    targetPoint.y = e.pageY - container.offset().top - target.height() / .27;
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


// using jquery i started by settiing the target variable to the .pt that is being pressed, then check if that element has a class of .tl, .tr, .bl, or .br, if so then set the transform property of that element to topLeft, topRight, bottomLeft, or bottomRight respectively, then call apply() on an object called onDragMove. when touch is released window touchmove and onDragMove are removed.

$(function() {
  $(".pt").on("touchstart:withPreventDefault mousedown", function(e) {
   
    target = $(this);
    if (target.hasClass("tl")) {
      targetPoint = transform.topLeft;
    } else if (target.hasClass("tr")) {
      targetPoint = transform.topRight;
    } else if (target.hasClass("bl")) {
      targetPoint = transform.bottomLeft;
    } else if (target.hasClass("br")) {
      targetPoint = transform.bottomRight;
    }
    $(window).on("touchmove mousemove", onDragMove);
  });
  $(window).on("touchend mouseup", function(e) {
    $(window).off("touchmove mousemove", onDragMove);
  });
});






















             
















 





























      


 





 




  












































































































    

































  














































