// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require dropzone
//= require bootstrap-sprockets
//= require turbolinks
//= require ckeditor/init
//= require ckeditor/plugins/widget/plugin
//= require ckeditor/plugins/widget/dev/console
//= require ckeditor/plugins/widgetselection/plugin
//= require ckeditor/plugins/lineutils/plugin
//= require ckeditor/plugins/image2/plugin
//= require alertify
//= require_tree .
//= stub footer

$(document).on("turbolinks:load", function() {
  CKEDITOR.replace('post_content');


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
})
