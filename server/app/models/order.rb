class Order < ApplicationRecord
  belongs_to :user

  has_many :products

  validates :cashier_name, presence: true
  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }

  enum role: %i(pending shipped cancelled completed returned), _default: :pending
end
