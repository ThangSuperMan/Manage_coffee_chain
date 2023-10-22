class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :product

  has_many :replies

  validates :body, presence: true
end
