class RemoveFieldPriceFromCategories < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :price
  end
end
