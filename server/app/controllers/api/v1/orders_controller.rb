module Api
  module V1
    class OrdersController < ApplicationController
      def create
        order = Order.new(order_params)
        if order.save
          render json: { message: 'Order created successfully' }, status: :created
        else
          render json: { error: order.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        order = Order.find(params[:id])
        order.update(order_params)

        render json: { message: 'Order updated successfully' }, status: :ok
      end

      def destroy
        order = Order.find(params[:id])
        order.destroy

        render json: { message: 'Order deleted successfully' }, status: :ok
      end

      private

      def order_params
        params.require(:order).permit(:user_id, :product_id, :quantity, :cashier_name, :status)
      end
    end
  end
end
