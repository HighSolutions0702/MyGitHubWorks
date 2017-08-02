class AddTransactionIdToBitcoinNetworkTransaction < ActiveRecord::Migration[5.0]
  def change
    add_column :bitcoin_network_transactions, :transaction_id, :integer
  end
end
