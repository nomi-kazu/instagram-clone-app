class Post < ApplicationRecord
  validates :content, presence: true

  has_many_attached :images
  
  belongs_to :user

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
end
