function upDate(previewPic) {
  // Log details for debugging
  console.log("Image hovered:", previewPic.alt, previewPic.src);

  // Change the background image of the div with id "image"
  document.getElementById("image").style.backgroundImage = `url(${previewPic.src})`;

  // Change the text content to the alt attribute of the image
  document.getElementById("image").innerHTML = previewPic.alt;
}

function undo() {
  // Reset the background image
  document.getElementById("image").style.backgroundImage = "url('')";

  // Reset the text content
  document.getElementById("image").innerHTML = "Hover over an image below to display here.";
}
