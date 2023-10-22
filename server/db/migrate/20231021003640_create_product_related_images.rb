class CreateProductRelatedImages < ActiveRecord::Migration[6.1]
  def change
    create_table :product_related_images do |t|
      t.references :product, null: false, foreign_key: true
      t.string :image_url, null: false

      t.timestamps
    end
  end
end
