module Api
  module V1
    class ProfilesController < Common::BaseController
      def index
        render json: current_user
      end

      def update
        # binding.pry
        current_user.update!(profile_params)
      end

      private

      def profile_params
        params.require(:profile).permit(:name, :email)
      end
    end
  end
end
