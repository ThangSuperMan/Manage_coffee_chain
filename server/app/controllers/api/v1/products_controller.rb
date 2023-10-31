module Api
  module V1
    class ProductsController < Common::BaseController
      load_and_authorize_resource
      before_action :doorkeeper_authorize!, except: [:index, :show]

      def index
        products = if params[:subcategory_id].present?
                     get_products_based_on_subcategory_slug(params[:subcategory_id])
                   elsif params[:category_id].present?
                     get_products_based_on_category_slug(params[:category_id])
                   else
                      Product.all
                   end

        render json: products
      end

      def show
        product = Product.find_by(slug: params[:slug])
        render json: product
      end

      def get_products_based_on_category_slug(category_slug)
        category = Category.includes(subcategories: :products).find_by(slug: category_slug)
        category&.subcategories&.flat_map(&:products)
      end

      def get_products_based_on_subcategory_slug(subcategory_slug)
        subcategory = Subcategory.find_by(slug: subcategory_slug)
        subcategory&.products
      end
    end
  end
end
