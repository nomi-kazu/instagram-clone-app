class User < ApplicationRecord
  validates :username, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :profile, dependent: :destroy

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  def prepare_profile
    profile || build_profile
  end

  def hasliked?(post)
    likes.exists?(post_id: post.id)
  end

  def avatar_image
    if profile&.avatar&.attached?
      profile.avatar
    else
      'Ellipse.png'
    end
  end
end
