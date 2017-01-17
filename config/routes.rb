Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  root 'posts#index'
  resources :posts
  resources :albums
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
