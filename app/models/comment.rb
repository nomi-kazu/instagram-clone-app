class Comment < ApplicationRecord
  validates :content, presence: true

  belongs_to :post
  belongs_to :user

  after_create :send_email

  private
  def send_email
    CommentMailer.new_comment(user, content).deliver_later
  end
end
