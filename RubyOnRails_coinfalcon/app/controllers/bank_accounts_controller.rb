class BankAccountsController < ApplicationController

  before_action :authenticate_user!

  def create
    bank_account = BankAccount.new(bank_account_params.merge(user_id: current_user.id))
    if bank_account.save
      flash[:success] = t('bank_account.created.success')
      render_success
    else
      render_fail(bank_account.errors.full_messages.join(", "))
    end
  end

  private
  def bank_account_params
    params.require(:bank_account).permit(:name, :iban, :bic)
  end
end
