class AddSubcategoryIdToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :subcategory_id, :integer
    add_foreign_key :products, :subcategories
  end
end
