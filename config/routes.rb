Rails.application.routes.draw do
  default_url_options :host => 'http://localhost:3000'

  resources :locations
  resources :users
  post "/login", to: 'sessions#create'
  get "/me", to: 'users#session_user'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"

  get "hello", to: 'application#hello_world'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
