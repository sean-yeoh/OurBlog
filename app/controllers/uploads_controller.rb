class UploadsController < ApplicationController
  def create
    @album = Album.find(params[:album_id])
    @upload = @album.uploads.create(upload_params)
    redirect_to @album
  end

  private
  def upload_params
    params.require(:upload).permit({filename: []})
  end

end
