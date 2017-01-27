Dropzone.autoDiscover = false;
var ready;
ready = function() {
  var newPhoto = new Dropzone("#new_photo");
  Dropzone.options.newPhoto = false;
  newPhoto.options.acceptedFiles = ".jpeg,.jpg,.png,.gif";
  newPhoto.on("complete", function(files) {
    var _this = this;
    if (_this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {
      setTimeout(function(){
        $('#myModal').modal('hide');
        var acceptedFiles = _this.getAcceptedFiles();
        var rejectedFiles = _this.getRejectedFiles();

        for(var index = 0; index < acceptedFiles.length; index++) {
          var file = acceptedFiles[index];
          var response = JSON.parse(file.xhr.response);
          appendContent(response.filename.url, response.filename.thumb.url, response.id, response.album_id);
        }

        if(acceptedFiles.length != 0) {
          alertify.success('Uploaded ' + acceptedFiles.length + ' files successfully.');
        }
        if(rejectedFiles.length != 0) {
          alertify.error('Error uploading ' + rejectedFiles.length + ' files. Only image files are accepted.');
        }

        _this.removeAllFiles();

      }, 2000);
    }
  });
};

var appendContent = function(photoUrl, photoThumbUrl, photoId, albumId) {
  $("#album-photos").prepend(

  '<div class="col-lg-3 col-md-3 col-xs-6 col-sm-6 thumb text-center">' +
    '<div class="thumbnail">' +
      '<a data-lightbox=' + albumId +' href="' + photoUrl + '">' +
        '<img class="img-responsive" src="' + photoThumbUrl + '"/>' +
      '</a>' +
    '</div' +
  '</div');
  $("#delete-selected-button").removeAttr('disabled');
  $("#delete-all-button").removeAttr('disabled');
  $("#no-photo").html("");
};

$(document).on('turbolinks:load', ready);