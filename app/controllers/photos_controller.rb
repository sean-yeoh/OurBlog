class PhotosController < ApplicationController
  def index
    @album_photos = Photo.all
    @active = :photos
  end

  def create
    @album = Album.find(params[:album_id])
    @photo = @album.photos.create(filename: params[:file])
    render json: @photo
  end

  def delete_selected
    @album = Album.find(params[:id])
    Photo.where(id: params[:photos]).destroy_all
    redirect_to @album
  end

  def delete_all
    @album = Album.find(params[:id])
    @album.photos.destroy_all
    redirect_to @album
  end

  private
  def photo_params
    params.require(:photo).permit(:filename)
  end
end
