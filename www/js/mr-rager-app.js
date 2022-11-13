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

// an array loop of 6 images from local folder and populate.background-wrapper with images that have a class of .background-thumbnail thumbnail

var bkgimages = [
  "img/bkg-folder/bkg-01.png",
  "img/bkg-folder/bkg-02.png",
  "img/bkg-folder/bkg-03.png",
  "img/bkg-folder/bkg-04.png",
  "img/bkg-folder/bkg-05.png",
  "img/bkg-folder/bkg-06.png",
];

$(function () {
  for (var i = 0; i < bkgimages.length; i++) {
    var img = $("<img />", {
      src: bkgimages[i],
      class: "background-thumbnail thumbnail panel-close ",
      id: "bkg-" + i,
    });
    $(".background-wrapper").append(img);
  }
});

// event listner function that clones .background-thumbnail onclick and appends it to .canvas-wrapper if the .canvas-wrapper has more than 1 image then remove the first image in the .canvas-wrapper and remove .thumbnail class from cloned image

$(function () {
  $(".background-wrapper").on("click", ".background-thumbnail", function () {
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

var targetPoint = {
  x: 0,
  y: 0,
};

var target = null;
var transform = null;

var transform = new PerspectiveTransform(img[0], IMG_WIDTH, IMG_HEIGHT, true);

var tl = pts.filter(".tl").css({
  left: transform.topLeft.x,
  top: transform.topLeft.y,
});

var tr = pts.filter(".tr").css({
  left: transform.topRight.x,
  top: transform.topRight.y,
});

var bl = pts.filter(".bl").css({
  left: transform.bottomLeft.x,
  top: transform.bottomLeft.y,
});

var br = pts.filter(".br").css({
  left: transform.bottomRight.x,
  top: transform.bottomRight.y,
});

// make sure the cursur is below center of the point when dragging

function onTouchMove(e) {
  targetPoint.x = e.pageX - container.offset().left - target.width() -50;
  targetPoint.y = e.pageY - container.offset().top - target.height() -70;
  target.css({
    left: targetPoint.x,
    top: targetPoint.y,
  });

  // check the polygon error, if it's 0, which mean there is no error
  if (transform.checkError() == 0) {
    transform.update();
    img.show();
  } else {
    img.hide();
  }
}

function onTouchEventHandle() {

  transform.topLeft.x = tl.position().left;
  transform.topLeft.y = tl.position().top;
  transform.topRight.x = tr.position().left;
  transform.topRight.y = tr.position().top;
  transform.bottomLeft.x = bl.position().left;
  transform.bottomLeft.y = bl.position().top;
  transform.bottomRight.x = br.position().left;
  transform.bottomRight.y = br.position().top;

  target = $(this);

  $(pts).on("touchstart", function (e) {
    target = $(this);
    onTouchMove(e.originalEvent.touches[0]);
  });

  $(pts).on("touchmove", function (e) {
    onTouchMove(e.originalEvent.touches[0]);
  });

  $(pts).on("touchend", function (e) {
    onTouchMove("X :" + e.changedTouches[0].pageX);
    onTouchMove("Y :" + e.changedTouches[0].pageX);
  });
}

pts.on("touchstart", onTouchEventHandle);
pts.on("touchmove", onTouchEventHandle);
pts.on("touchend", onTouchEventHandle);


$(function () {

  $(".pt").on("touchstart:withPreventDefault mousedown", function (e) {
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

    $(window).on("touchmove:withPreventDefault mousemove", onTouchMove);

    $(window).on("touchend:withPreventDefault mouseup", function onTouchEnd() {
      $(window).off("touchmove:withPreventDefault mousemove", onTouchMove);
    });

    onTouchMove.apply(this, Array.prototype.slice.call(arguments));
  });
});


// dynamic array of maximum 200 and minimum is the current amount of found images, add the sum of images in local folder, preload and store in an object array named GraffitiArray using jquery

var GraffitiArray = [];
var GraffitiArrayLength = 0;
var GraffitiArrayLengthMax = [200];
var GraffitiArrayLengthMin = 0;

for (var i = GraffitiArrayLengthMin; i < GraffitiArrayLengthMax; i++) {
  src = "img/graffiti/graffiti-" + i + ".png";
  GraffitiArray[i] = new Image();
  GraffitiArray[i] = src;
  GraffitiArrayLength++;
}
// console.log(GraffitiArray);

// an onLoad function Graffiti-img-200-ok that recieves and stores the an array of the images that have a response of 200, the image is not loaded and is not stored in the new array GraffitiArrayReady

function GraffitiImg200Ok() {
  var GraffitiArrayReady = [];
  for (var i = 0; i < GraffitiArray.length; i++) {
    var img = new Image();
    img.src = GraffitiArray[i];
    img.onload = function () {
      GraffitiArrayReady.push(this.src);
    };
  }
  console.log(GraffitiArrayReady);
}

$(window).on("load", GraffitiImg200Ok);
































































