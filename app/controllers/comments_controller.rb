class CommentsController < ApplicationController
  def index
    post = Post.find(params[:post_id])
    comments = post.comments
    
    render json: comments, Include: { user: [:profile] }
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.save!

    render json: @comment, include: { user: [:profile] }
  end

  private
  def comment_params
    params.require(:comment).permit(:content).merge(user_id: current_user.id)
  end

end