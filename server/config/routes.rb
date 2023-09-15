Rails.application.routes.draw do
  use_doorkeeper do
    skip_controllers :authorizations, :application, :authorized_applications
  end

  devise_for :users

  root 'bookmarks#index'
  namespace :api do
    namespace :v1 do
      resources :bookmarks
    end
  end
end
