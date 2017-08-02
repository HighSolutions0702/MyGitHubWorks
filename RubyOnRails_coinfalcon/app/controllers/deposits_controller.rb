class DepositsController < ApplicationController

  include ActionView::Helpers::DateHelper

  before_action :authenticate_user!

  def euro
    @transfers = {}
    render 'transfers/index'
  end

  def bitcoin
    @qr_unit = browser.device.mobile?? 6: 10
    current_user.deposit_bitcoin_addresses << DepositBitcoinAddress.single_unassigned if current_user.deposit_bitcoin_addresses.count == 0 && DepositBitcoinAddress.single_unassigned.present?
    current_user.reload
    @transfers = current_user.deposit_bitcoin_transfers.order(created_at: :desc).page params[:page]
    render 'transfers/index'
  end

  def new_bitcoin_address
    if current_user.can_assign_address?
      current_user.deposit_bitcoin_addresses << DepositBitcoinAddress.single_unassigned if DepositBitcoinAddress.single_unassigned.present?
      current_user.reload
      render 'transfers/deposits/_new_bitcoin_address', layout: "empty"
    else
      render text: "Please wait #{distance_of_time_in_words(Time.now, current_user.next_assign_address_date)}"
    end
  end

  def ethereum
    render 'transfers/index'
  end
end
