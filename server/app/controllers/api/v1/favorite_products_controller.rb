module Api
  module V1
    class FavoriteProductsController < Common::BaseController
      def index
        product_favorites = FavoriteProduct.all
        products = product_favorites.map(&:product)

        render json: products
      end

      def create
        product = Product.find_by(slug: params[:product][:slug])
        product_favorite = FavoriteProduct.create(
          product: product,
          user: current_user
        )

        render json: product_favorite, message: 'Thêm sản phầm vào danh dánh ưa thích, thành công!'
      end

      def destroy
        product = Product.find_by(slug: params[:slug])
        favorite_product = FavoriteProduct.find_by(product_id: product.id)
        favorite_product.destroy

        render json: { message: 'Đã xoá sản phẩm yêu thích' }, status: :ok
      end

      private

      def product_params
        params.require(:product).permit(:slug)
      end
    end
  end
end
