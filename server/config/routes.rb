Rails.application.routes.draw do
  mount Coverband::Reporters::Web.new, at: '/coverage'

  use_doorkeeper
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      resources :bookmarks, only: [:index, :show]
    end
  end
end
