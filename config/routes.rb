Rails.application.routes.draw do
  default_url_options :host => 'http://localhost:3000'

  resources :locations, only: [:create]
  resources :users, only: [:index, :show, :create, :update]
  resources :studies, only: [:create, :index]
  
  post "/login", to: 'sessions#create'
  delete "/logout", to: 'sessions#destroy'

  get "/me", to: 'users#session_user'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"

  get "hello", to: 'application#hello_world'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
