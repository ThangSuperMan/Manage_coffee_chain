class ProductSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :body,
             :meta_title,
             :slug,
             :price,
             :image_url,
             :created_at,
             :updated_at

  def price
    sprintf('%.3f', object.price)
  end
end
