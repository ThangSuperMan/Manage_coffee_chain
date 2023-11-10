module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    # before_action :doorkeeper_authorize!, except: [:index, :show]

    def connect
      # binding.pry
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      # user = Doorkeeper::AccessToken.find_by(
      #   token: request.headers['Authorization']&.split(' ')&.last
      # )
      # verified_user = User.find(user.resource_owner_id)
      #
      # if verified_user.present?
      #   verified_user
      # else
      #   reject_unauthorized_connection
      # end
    end
  end
end
