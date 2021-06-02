class Post < ApplicationRecord
  validates :content, presence: true

  has_many_attached :images
  
  belongs_to :user
end
