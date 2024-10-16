function upDate(previewPic) {
  console.log("Image hovered or focused:", previewPic.alt, previewPic.src);

  // Change the background image of the div with id "image"
  document.getElementById("image").style.backgroundImage = `url(${previewPic.src})`;

  // Change the text content to the alt attribute of the image
  document.getElementById("image").innerHTML = previewPic.alt;
}

function undo() {
  console.log("Image unfocused or mouse left");

  // Reset the background image
  document.getElementById("image").style.backgroundImage = "url('')";

  // Reset the text content
  document.getElementById("image").innerHTML = "Hover over an image below to display here.";
}

function pageLoaded() {
  console.log("Page loaded");

  // Add tabindex and log tabfocus attribute
  let images = document.querySelectorAll(".preview");

  for (let i = 0; i < images.length; i++) {
      images[i].setAttribute("tabindex", "0");
      console.log("Tab index added to image:", images[i].alt);
  }
}
