class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :body
      t.string :meta_title
      t.string :slug
      t.decimal :price, precision: 4, scale: 2
      t.string :image_url
      t.datetime :published_at
      t.datetime :start_at
      t.datetime :end_at

      t.timestamps
    end
  end
end
