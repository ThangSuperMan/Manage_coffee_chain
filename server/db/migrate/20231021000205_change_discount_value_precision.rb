class ChangeDiscountValuePrecision < ActiveRecord::Migration[6.1]
  def change
    change_column :vouchers, :discount_value, :decimal, precision: 6, scale: 2
  end
end
