class CreateSubcategories < ActiveRecord::Migration[6.1]
  def change
    create_table :subcategories do |t|
      t.references :category, null: false, foreign_key: true
      t.string :name
      t.string :slug

      t.timestamps
    end
  end
end
