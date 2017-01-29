$(document).on("turbolinks:load", function() {
  $("#kartik-uploadasync-false").fileinput({
    allowedFileType: "image",
    allowedFileExtensions: ["jpg", "gif", "png", "jpeg"],
    uploadUrl: window.location.href + "/uploads", // server upload action
    uploadAsync: false,
    maxFileCount: 10,
    browseOnZoneClick: true,
    previewSettings: {
        image: { width: "200px", height: "150px"}
    },
    fileActionSettings: {
        showUpload: false
    }
  });
});