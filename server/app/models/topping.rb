class Topping < ApplicationRecord
  belongs_to :product

  validates :name, presence: true
  validates :price, presence: true
end
