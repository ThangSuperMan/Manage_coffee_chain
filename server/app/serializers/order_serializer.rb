class OrderSerializer < ActiveModel::Serializer
  attributes :id,
             :product_id,
             :quantity,
             :cashier_name,
             :status,
             :created_at,
             :updated_at

  belongs_to :user do
    object.user.email
  end
end
