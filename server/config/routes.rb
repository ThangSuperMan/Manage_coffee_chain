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
      # resources :profiles, only: [:index, :update]
      # patch 'profile/update', to: 'profiles#update'

      get 'profile', to: 'profiles#index'
      patch 'profile', to: 'profiles#update'

      resources :user, only: [:index, :create]
      # resource :profile, only: [:index]
      # match '/profile', to: 'profile#update', via: [:patch, :put]

      # updateo 'favorite_products/:slug', to: 'favorite_products#destroy', as: :destroy_favorite_product
      # update 'profile', to: 'profile#update', as: :update_profile
      resources :bookmarks, only: [:index, :show]

      resources :products, only: [:show], param: :slug
      resources :products, only: [:create, :edit]

      resources :orders, only: [:index, :create, :update, :destroy]
      resources :favorite_products, only: [:index, :create, :update]
      delete 'favorite_products/:slug', to: 'favorite_products#destroy', as: :destroy_favorite_product

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
