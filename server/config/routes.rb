Rails.application.routes.draw do
  mount Coverband::Reporters::Web.new, at: '/coverage'

  mount ActionCable.server => '/cable'

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  use_doorkeeper
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :user, only: [:index, :create]
      resources :bookmarks, only: [:index, :show]

      resources :products, only: [:show], param: :slug
      resources :products, only: [:create, :edit]

      resources :category, only: [:index]

      resources :categories do
        resources :products, only: [:index]
      end

      resources :subcategories do
        resources :products, only: [:index]
      end
    end
  end
end
