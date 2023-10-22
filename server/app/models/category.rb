class Category < ApplicationRecord
  # has_many :product_categories
  # has_many :products, through: :product_categories
  has_many :subcategories

  validates :name, presence: true
  validates :slug, presence: true
end
