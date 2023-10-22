class CreateUserCookieConsentReferences < ActiveRecord::Migration[6.1]
  def change
    create_table :user_cookie_consent_references do |t|
      t.references :user, null: false, foreign_key: true
      t.string :user_agent, null: false
      t.jsonb :decision, default: {}, null: false

      t.timestamps
    end
  end
end
