class CreateToppings < ActiveRecord::Migration[6.1]
  def change
    create_table :toppings do |t|
      t.references :product, null: false, foreign_key: true
      t.string :name
      t.decimal :price, precision: 6, scale: 2

      t.timestamps
    end
  end
end
