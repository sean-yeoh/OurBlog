$(document).on("turbolinks:load", function() {
  $("#kartik-upload").fileinput({
    showUpload: false,
    previewFileType: "image",
    allowedFileExtensions: ["jpg", "gif", "png", "jpeg"]
  });
});