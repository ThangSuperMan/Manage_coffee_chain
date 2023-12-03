class ProductFavoriteSerializer < ActiveModel::Serializer
  attributes :id

  has_many :product
end
