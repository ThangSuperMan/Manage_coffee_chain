class CreateVouchers < ActiveRecord::Migration[6.1]
  def change
    create_table :vouchers do |t|
      t.references :product, null: false, foreign_key: true
      t.integer :code, null: false
      t.string :description, null: false
      t.integer :discount_type, null: false
      t.decimal :discount_value, precision: 4, scale: 2, null: false
      t.boolean :is_used, default: false
      t.datetime :start_at, null: false
      t.datetime :end_at, null: false

      t.timestamps
    end
  end
end
