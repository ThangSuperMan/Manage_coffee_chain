class SizeSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :price

  def price
    printf('%.3f', object.price)
  end
end
