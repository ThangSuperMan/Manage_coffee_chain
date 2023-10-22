class CreateProductSizes < ActiveRecord::Migration[6.1]
  def change
    create_table :product_sizes do |t|
      t.references :product
      t.references :size

      t.timestamps
    end
  end
end
