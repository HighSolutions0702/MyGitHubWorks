Rails.application.routes.draw do
  devise_for  :users, :path => '', controllers: { registrations: 'registrations' }, skip: [:session]

  as :user do
    get '/login' => 'devise/sessions#new', :as => :new_user_session

    post '/login' => 'devise/sessions#create', :as => :user_session
    
    delete '/logout' => 'devise/sessions#destroy', :as => :destroy_user_session
  end

  namespace :users do
    get 'enable_otp'
    post 'disable_otp'
    post 'sent_enable_otp_email'
    post 'login_without_otp'
  end

  resource :bank_accounts, only: [:create]
  
  # settings
  scope path: 'settings', as: 'settings' do
    get '/' => 'settings#index'
    get '/account' => 'settings#account'
    get '/security' => 'settings#security'

    patch '/account/update' => 'settings#account_update', :as => :account_update
    patch '/security/email_update' => 'settings#email_update', :as => :email_update
    patch '/security/password_update' => 'settings#password_update', :as => :password_update
  end

  get '/transfers' => 'transfers#index'
  scope path: 'transfers', as: 'transfers' do
    scope path: 'deposit', as: 'deposit' do
      get '/euro' => 'deposits#euro'
      get '/bitcoin' => 'deposits#bitcoin'
      get '/new_bitcoin_address' => 'deposits#new_bitcoin_address'
      get '/ethereum' => 'deposits#ethereum'
    end
    scope path: 'withdraw', as: 'withdraw' do
      get '/euro' => 'withdraws#euro'
      post '/euro' => 'withdraws#withdraw_euro', as: :do_euro
      get '/bitcoin' => 'withdraws#bitcoin'
      post '/bitcoin' => 'withdraws#withdraw_bitcoin', as: :do_bitcoin
      get '/ethereum' => 'withdraws#ethereum'
    end
  end

  resource :orders, only: [:new, :create]

  get '/summary' => 'summary#index'
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end

  match '/404', :to => 'errors#not_found', :via => :all
  match '/500', :to => 'errors#internal_server_error', :via => :all
  mount API::V1::Mount => '/api/v1'
  
  root to: 'landingpage#index'
end
