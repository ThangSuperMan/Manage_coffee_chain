class CategorySerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :slug,
             :created_at,
             :updated_at

  has_many :subcategories
end
