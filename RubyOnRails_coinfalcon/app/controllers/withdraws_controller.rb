class WithdrawsController < ApplicationController

  before_action :authenticate_user!
  before_action :set_transfer, only: [:withdraw_euro, :withdraw_bitcoin]

  def euro
    gon.currency = 'currency'
    @transfer = Transfer.new
    @transfers = current_user.withdraw_euro_transfers.order(created_at: :desc).page params[:page]
    render 'transfers/index'
  end

  def withdraw_euro
    gon.currency = 'currency'
    ap params
    amount = transfer_params[:amount].gsub(',', '.').to_d
    if current_user.eur_sum <= amount
      flash[:danger] = t('do_withdraw.euro.not_enough')
      render_fail('', {redirect_url: transfers_withdraw_do_euro_url})
    else
      if @user.otp_required_for_login && !@otp_verified
        render_success({current_step: 'check_withdraw_euro'})
      else
        @transfer.update({amount: amount, address_type: 'BankAccount', user_id: current_user.id, transfer_type: 'withdraw', currency_id: Currency.find_by_code('eur').id})
        render_success({current_step: '2factor'})
      end
    end

  end

  def bitcoin
    gon.currency = 'btc'
    @transfer = Transfer.new
    @transfers = current_user.withdraw_bitcoin_transfers.order(created_at: :desc).page params[:page]
    render 'transfers/index'
  end

  def withdraw_bitcoin
    ap params
    gon.currency = 'btc'
    amount = transfer_params[:amount].to_d + 0.0004
    if !Bitcoin::valid_address?(transfer_params[:bitcoin_address])
      flash[:danger] = t('do_withdraw.bitcoin.address_invalid')
      render_fail('', {redirect_url: transfers_withdraw_do_bitcoin_url})
    elsif current_user.btc_sum <= amount
      flash[:danger] = t('do_withdraw.bitcoin.not_enough')
      render_fail('', {redirect_url: transfers_withdraw_do_bitcoin_url})
    else
      ap !@otp_verified
      ap @user.otp_required_for_login && !@otp_verified
      if @user.otp_required_for_login && !@otp_verified
        render_success({current_step: 'check_withdraw_bitcoin'})
      else
        @bitcoin_address = WithdrawBitcoinAddress.find_or_create_by!(address: transfer_params[:bitcoin_address])
        # think about it
        @bitcoin_address.update(user_id: current_user.id) if @bitcoin_address.user_id.nil?
        ap 'in withdraw bitcoin'
        @transfer.update({address_type: 'WithdrawBitcoinAddress', amount: amount, address_id: @bitcoin_address.id, user_id: current_user.id, transfer_type: 'withdraw', currency_id: Currency.find_by_code('btc').id})
        @transfer.bitcoin_network_transaction.notify_bitcoin_server
        render_success({current_step: '2factor'})
      end
    end

  end

  def ethereum
    render 'transfers/index'
  end

  private

  def set_transfer
    @transfer = Transfer.new(transfer_params)
    @address = @transfer.address
  end

  def transfer_params
    params.require(:transfer).permit(:address_type, :address_id, :amount, :bitcoin_address)
  end

end
