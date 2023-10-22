class CreateSizes < ActiveRecord::Migration[6.1]
  def change
    create_table :sizes do |t|
      t.string :name
      t.decimal :price, precision: 6, scale: 2

      t.timestamps
    end
  end
end
