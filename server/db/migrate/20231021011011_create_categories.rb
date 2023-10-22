class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :slug
      t.string :meta_title
      t.decimal :price, precision: 4, scale: 2

      t.timestamps
    end
  end
end
