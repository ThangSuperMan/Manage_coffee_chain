module Api
  module V1
    class ProductController < Common::BaseController
      load_and_authorize_resource
      before_action :doorkeeper_authorize!, except: [:index]

      def index
        @products = Product.all
        render json: @products
      end

      def show
        slug = params[:id]
        @product = Product.find_by(slug: slug)
        render json: @product
      end
    end
  end
end
