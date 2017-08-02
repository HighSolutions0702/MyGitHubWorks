class SetDefaultConfirmations < ActiveRecord::Migration[5.0]
  def change
    change_column_default :bitcoin_network_transactions, :confirmations, 0
  end
end
