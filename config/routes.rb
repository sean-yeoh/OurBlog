Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  root 'posts#index'
  get '/cancel_new', to: 'albums#cancel_new'
  get '/cancel_edit', to: 'albums#cancel_edit'
  get '/photos', to: 'photos#index'
  get '/albums/:id/edit_album', to: 'albums#edit_album_with_photos', as: 'edit_album_with_photos'
  delete '/albums/:id/delete_selected', to: "photos#delete_selected", as: 'delete_selected'
  delete '/albums/:id/delete_all', to: "photos#delete_all", as: 'delete_all'
  resources :posts
  resources :albums do
    resources :photos, only: [:create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
