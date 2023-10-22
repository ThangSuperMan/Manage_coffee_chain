class Size < ApplicationRecord
  validates :name, presence: true
  validates :price, presence: true

  has_many :product_sizes
  has_many :products, through: :product_sizes
end
