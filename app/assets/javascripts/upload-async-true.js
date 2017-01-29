$(document).on("turbolinks:load", function() {
  $("#kartik-uploadasync-true").fileinput({
    allowedFileType: "image",
    allowedFileExtensions: ["jpg", "gif", "png", "jpeg"],
    uploadUrl: window.location.href + "/photos", // server upload action
    uploadAsync: true,
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