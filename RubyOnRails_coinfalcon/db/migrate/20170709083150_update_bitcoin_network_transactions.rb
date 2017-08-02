class UpdateBitcoinNetworkTransactions < ActiveRecord::Migration[5.0]
  def change
    rename_column :bitcoin_network_transactions, :bitcoin_address_id, :deposit_bitcoin_address_id
  end
end
