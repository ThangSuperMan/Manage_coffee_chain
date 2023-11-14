class Order < ApplicationRecord
  belongs_to :user

  attribute :status, :integer, default: 0
  validates :cashier_name, presence: true
  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }

  enum role: %i(pending completed returned), _default: :pending
end
