
var app = new Framework7({
  // App root element
  el: "#app",
  // other parameters

  routes: [
    {
      path: "/index/",
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


$(function () {
  $(".background-wrapper").on("click", ".background-thumbnail", function () {
    var clonebkg = $(this).clone();
    $(".canvas-wrapper").append(clonebkg);
    $(".instructions").hide();
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

// make sure the cursur is below center of the point when dragging to ensure visibility of the graffity active transform point

function onTouchMove(e) {
  targetPoint.x = e.pageX - container.offset().left - target.width() - 50;
  targetPoint.y = e.pageY - container.offset().top - target.height() - 100;
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
var GraffitiArrayLengthMax = [120];
var GraffitiArrayLengthMin = 0;

for (var i = GraffitiArrayLengthMin; i < GraffitiArrayLengthMax; i++) {
  src = "img/graffiti/graffiti-" + i + ".png";
  GraffitiArray[i] = new Image();
  GraffitiArray[i] = src;
  GraffitiArrayLength++;
}

// console.log(GraffitiArray);







// GraffitiSets hides all but the first slice of 12 thumbnails

function GraffitiLOADED() {
  for (var i = 0; i < GraffitiArrayLength; i++) {
    var img = $("<img />", {
      src: GraffitiArray[i],
      class: "graffiti-thumbnail thumbnail panel-close ",
      id: "graffiti-" + i,
    });
    $(".graffiti-wrapper").append(img); 
  }
}

$(function () {
  GraffitiLOADED();
});






// this fuction is used to dynamically move the slice of GraffitiLOADED by 12 thumbnails each time the button is clicked and hide the previous slice of 12 thumbnails until the end of the array is reached then it will start again from the beginning of the array 


var GraffitiArrayLengthMin = 0;
var GraffitiArrayLengthMax = 12;
var GraffitiArrayLength = 120;


function GraffitiNext() {

  $(".graffiti-thumbnail").hide();
  $(".graffiti-thumbnail").slice(GraffitiArrayLengthMin, GraffitiArrayLengthMax).show();
  GraffitiArrayLengthMin += 12;
  GraffitiArrayLengthMax += 12;

  if (GraffitiArrayLengthMax > GraffitiArrayLength) {
    GraffitiArrayLengthMin = 0;
    GraffitiArrayLengthMax = 12;
  } 
}


$(function () {
  GraffitiNext();
});


// call the function on click of nav-button-bottom 

$(".nav-button-bottom").on("click", function () {
  GraffitiNext();
});







// GraffitiPrev reverses current slice of 12 thumbnails and show the previous slice of 12 thumbnails until the beginning of the array is reached then it will start again from the end of the array

var GraffitiArrayLengthMin = 0;
var GraffitiArrayLengthMax = 12;
var GraffitiArrayLength = 120;

function GraffitiPrev() {
  $(".graffiti-thumbnail").hide();
  $(".graffiti-thumbnail").slice(GraffitiArrayLengthMin, GraffitiArrayLengthMax).show();
  GraffitiArrayLengthMin -= 12;
  GraffitiArrayLengthMax -= 12;

  if (GraffitiArrayLengthMin < 0) {
    $(".graffiti-thumbnail").slice(GraffitiArrayLengthMin, GraffitiArrayLengthMax).show();
    GraffitiArrayLengthMin = 108;
    GraffitiArrayLengthMax = 120;
  }
}

$(function () {
  GraffitiPrev();
  GraffitiNext();
});


// call the function on click of nav-button-top

$(".nav-button-top").on("click", function () {
  GraffitiPrev();
});



// on the tap of a graffiti-thumbnail #draggable is unhidden and the graffiti-thumbnail which is touched or pressed img is loaded into .img background-image

function GraffitiSelect() {
  $(".graffiti-thumbnail").on("click", function () {
    $(".instructions").hide();
    $(".img").css("background-image", "url(" + $(this).attr("src") + ")");
    $("#draggable").css("display", "flex");
  });
}

$(function () {
  GraffitiSelect();
});

//refresh page to reload the page on click or touch of .nav-logo

function refreshPage() {
  window.location.reload();
}

$(function () {
  $(".nav-logo").on("click", function () {
    refreshPage();
  });
});


// .overlay-opt is hidden on page load, and is unhidden after .tl, tr,bl, and br are touched or pressed 

function overlayOpt() {
  $(".overlay-opt, .overlay-header").hide();
  $(".tl, .tr, .bl, .br").on("touchstart mousedown", function () {
    $(".overlay-opt, .overlay-header").show();
  });
}

//call the function on page load

$(function () {
  overlayOpt();
});

// PickOverlayNum, which is used to dynamically change the MixBlendMode of .warp-canvas to the corresponding nnmbers of the overlay-opt button.

function PickOverlayNum() {
  $("#1-normal").on("touchstart mousedown", function () {
    $(".warp-canvas").css("mix-blend-mode", "normal");
  });
  $("#2-multiply").on("touchstart mousedown", function () {
    $(".warp-canvas").css("mix-blend-mode", "multiply");
  });
  $("#3-color-dodge").on("touchstart mousedown", function () {
    $(".warp-canvas").css("mix-blend-mode", "color-dodge");
  });
  $("#4-overlay").on("touchstart mousedown", function () {
    $(".warp-canvas").css("mix-blend-mode", "overlay");
  });
  $("#5-soft-light").on("touchstart mousedown", function () {
    $(".warp-canvas").css("mix-blend-mode", "soft-light");
  });
  $("#6-difference").on("touchstart mousedown", function () {
    $(".warp-canvas").css("mix-blend-mode", "difference");
  });
  $("#7-exclusion").on("touchstart mousedown", function () {
    $(".warp-canvas").css("mix-blend-mode", "exclusion");
  });
}

// call the function on page load

$(function () {
  PickOverlayNum();
});


// ensure that each overlay is only active when the corresponding overlay is selected, else if the overlay is not selected, the overlay is not active 

function ActiveOverlay() {
  $(".overlay-button").on("touchstart mousedown", function () { 
    $(".overlay-button").removeClass("Btn-active");
    $(this).addClass("Btn-active");
  });
}

$(function () {
  ActiveOverlay();
});


// function VibisilityToggle adds the class .visibility-button-active to .visibility-button when it is pressed or touched, and replaces .visibility-button a tag with "Visibility_Off", when the button is pressed or touched again, the class .visibility-button-active is removed from .visibility-button and the .visibility-button a tag is replaced with "Visibility"

function VisibilityToggle() {
  $(".visibility-button").on("touchpress mouseup", function () {
    $(this).toggleClass("visibility-button-active");
    $(".pt, .tl, .tr, .bl, .br").hide();
    if ($(this).hasClass("visibility-button-active")) {
      $(this).html("<p>Visibility_Off</p>");
    } else {
      $(this).html("<p>Visibility</p>");
      $(".pt").show();
    } 
  });
}

$(function () {
  VisibilityToggle();
} );


//the function DownloadCanvas is using html2canvas document.getElementByName to take a screenshot of .canvas-plane on the touch or press of .download-btn, and then using canvas2image.js the screenshot is converted to a jpg image and then the image is downloaded to the users device local file system
// for desktop // 
function DownloadCanvas() {
$(".download-btn").on("touchstart mousedown", function () {
  $(".card-header p").replaceWith("<p>Created by Mizzchff-Graffiti</p>");
  $(".download-btn").on("touchstart mousedown", function () {
    html2canvas(document.querySelector(".canvas-plane")).then(canvas => {
      Canvas2Image.saveAsJPEG(canvas, 1080, 1080, "Mizzchff-Graffiti");
    });
  });

});
}

$(function () {
  DownloadCanvas();
});


// cordova screeshot plugin for mobile devices //


// first make sure cordova screenshot plugin method .save is defined as a global variable, then saveMobileCanvas uses the cordova screenshot plugin to take a screenshot of only .canvas-plane on the touch or press of .download-btn and save to the users device local file system 

function saveMobileCanvas() {
  $(".download-btn").on("touchstart mousedown", function () {
    $(".card-header p").replaceWith("<p>Created by Mizzchff-Graffiti</p>");
    $(".download-btn").on("touchstart mousedown", function () {
      navigator.screenshot.save(function (error, res) {
        if (error) {
          console.error(error);
        } else {
          console.log('Screenshot saved in: ' + res.filePath);
        }
      }, 'jpg', 100, 'Mizzchff-Graffiti');
    });
  });
}



// call the function on page load

$(function () {
  saveMobileCanvas();
});

// followed https://github.com/gitawego/cordova-screenshot to install cordova screenshot plugin and implrment it but it is not working on mobile devices, it is only working on desktop devices.















































 















































































