class AlbumsController < ApplicationController
  def index
    @albums = Album.all
    @active = :albums
  end

  def new
    @album = Album.new

    if signed_out?
      redirect_to albums_path
    end
  end

  def create
    @album = current_user.albums.new(album_params)

    if signed_out?
      redirect_to @album
    end

    respond_to do |format|
      if @album.save
        format.html { redirect_to @album }
      else
        format.js
      end
    end
  end

  def cancel_new
  end

  def cancel_edit
  end

  def show
    @album = Album.find(params[:id])
    @photo = Photo.new
    @photos = @album.photos
  end

  def edit
    @album = Album.find(params[:id])
    if signed_out?
      redirect_to @album
    end
  end

  def edit_album_with_photos
    @album = Album.find(params[:id])
    if signed_out?
      redirect_to @album
    end
  end

  def update
    @album = Album.find(params[:id])

    if signed_out?
      redirect_to @album
    end

    respond_to do |format|
      if @album.update(album_params)
        format.html { redirect_to @album }
      else
        format.js
      end
    end
  end

  def destroy
    @album = Album.find(params[:id])
    if signed_in?
      @album.destroy
      redirect_to albums_path
    else
      redirect_to @album
    end
  end

  private
  def album_params
    params.require(:album).permit(:name)
  end
end
