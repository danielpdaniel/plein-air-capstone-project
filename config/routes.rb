Rails.application.routes.draw do
  default_url_options :host => 'http://localhost:3000'

  resources :users, only: [:index, :show, :create, :update] 
  resources :studies, only: [:create, :index, :show, :update, :destroy]
  resources :locations, only: [:index, :create]
  resources :comments, only: [:create, :destroy]
  # resources :notifications, only: [:update]
  get "/notifications", to: "notifications#mark_all_as_read"

  post "/login", to: 'sessions#create'
  delete "/logout", to: 'sessions#destroy'

  get "/me", to: 'users#session_user'

  get "/locations/:tag_name", to: 'locations#tag_filter'

  get "/users/:id/tagged/:tag_name", to: 'studies#user_tag_filter'
  get "/tagged/:tag_name", to: 'studies#tag_filter'
  

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
