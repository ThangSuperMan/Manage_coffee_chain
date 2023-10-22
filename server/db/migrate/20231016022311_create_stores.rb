class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :area_code
      t.string :state
      t.string :district
      t.string :ward
      t.string :full_address

      t.timestamps
    end
  end
end
