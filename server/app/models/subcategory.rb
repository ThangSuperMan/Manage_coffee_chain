class Subcategory < ApplicationRecord
  belongs_to :category

  has_many :products

  validates :name, presence: true
  validates :slug, presence: true
end
