class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :stores
  has_many :user_cookie_consent_references, dependent: :delete_all
  has_many :orders, dependent: :delete_all

  validates :email, format: URI::MailTo::EMAIL_REGEXP

  enum role: %i(user superadmin cashier)

  def self.authenticate(email, password)
    user = User.find_for_authentication(email: email)
    user&.valid_password?(password) ? user : nil
  end
end
