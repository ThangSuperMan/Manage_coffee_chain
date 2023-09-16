module Api
  module V1
    class BaseController < ApplicationController
      before_action :doorkeeper_authorize!

      private

      def current_user
        user = Doorkeeper::AccessToken.find_by(token: request.headers['Authorization']&.split(' ')&.last)
        if user.present?
          @current_user = User.find(user.resource_owner_id)
        end
      end
    end
  end
end
