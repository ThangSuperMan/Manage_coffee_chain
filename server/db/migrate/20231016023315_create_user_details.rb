class CreateUserDetails < ActiveRecord::Migration[6.1]
  def change
    create_table :user_details do |t|
      t.references :user, null: false, foreign_key: true
      t.string :phone_number
      t.boolean :has_vip_hard
      t.string :image_url
      t.string :address

      t.timestamps
    end
  end
end
