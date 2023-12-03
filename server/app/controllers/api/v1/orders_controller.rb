module Api
  module V1
    class OrdersController < Common::BaseController
      load_and_authorize_resource

      def index
        orders = Order.all

        render json: orders
      end

      def create
        user = User.find_by(email: params[:email])
        order = user.orders.create!(order_params)

        render json: order
      end

      def update
        order = Order.find(params[:id])
        order.update(order_params)

        render json: { message: 'Đơn hàng cập nhật thành công', order: order }, status: :ok
      end

      def destroy
        order = Order.find(params[:id])
        order.destroy

        render json: { message: 'Order deleted successfully' }, status: :ok
      end

      private

      def order_params
        params.require(:order).permit(:product_id, :email, :quantity, :cashier_name, :status)
      end
    end
  end
end
