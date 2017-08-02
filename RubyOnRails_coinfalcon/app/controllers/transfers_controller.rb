class TransfersController < ApplicationController

  def index
    @user = current_user
    render 'transfers/index'
  end
end
