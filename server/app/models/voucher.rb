class Voucher < ApplicationRecord
  belongs_to :product

  enum discount_type: %i(percentage fixed_amount)
end
