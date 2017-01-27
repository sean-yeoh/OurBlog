class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
    if signed_out?
      redirect_to posts_path
    end
  end

  def create
    @post = current_user.posts.new(post_params)

    if signed_out?
      redirect_to posts_path
    end

    if @post.save
      redirect_to @post
    else
      flash.now.notice = @post.errors.full_messages.join(', ')
      render 'new'
    end
  end

  def edit
    @post = Post.friendly.find(params[:id])
    if signed_out?
      redirect_to @post
    end
  end

  def show
    @post = Post.friendly.find(params[:id])
  end

  def update
    @post = Post.friendly.find(params[:id])
    if signed_out?
      redirect_to @post
    end

    if @post.update(post_params)
      redirect_to @post
    else
      flash.now.notice = @post.errors.full_messages.join(', ')
      render 'new'
    end
  end

  def destroy
    @post = Post.friendly.find(params[:id])
    if signed_in?
      @post.destroy
      redirect_to posts_path
    else
      redirect_to @post
    end
  end

  private
  def post_params
    params.require(:post).permit(:title, :content)
  end
end
