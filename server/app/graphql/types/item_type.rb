module Types
  class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :description, String, null: false
    field :image_url, String, null: false
    field :artist_id, ID, null: false
    field :artist, Types::ArtistType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
