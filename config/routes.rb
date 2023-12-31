# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
  mount ActionCable.server => '/cable'

  namespace :api do
    scope :auth do
      post 'login' => 'sessions#create'
      post 'me' => 'sessions#me'
      post 'signup' => 'users#create'
      delete 'logout' => 'sessions#destroy'
    end

    scope :videos do
      post 'create' => 'videos#create'
      get '/' => 'videos#index'
      get '/:id' => 'videos#show'
    end
  end
  # Defines the root path route ("/")
  # root "posts#index"
end
