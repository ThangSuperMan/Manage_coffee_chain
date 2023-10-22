Rails.application.routes.draw do
  mount Coverband::Reporters::Web.new, at: '/coverage'

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  use_doorkeeper
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :user, only: [:create]
      resources :bookmarks, only: [:index, :show]
      resources :products, only: [:index, :show]
    end
  end
end
