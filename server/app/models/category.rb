class Category < ApplicationRecord
  has_many :subcategories

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
end
