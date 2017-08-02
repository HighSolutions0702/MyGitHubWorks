class ChangeBankAccountIdInTransactions < ActiveRecord::Migration[5.0]
  def change
    remove_column :transactions, :bankAccountId
    add_column :transactions, :bank_account_id, :integer
  end
end
