class RemoveAddressInBitcoinNetworkTransaction < ActiveRecord::Migration[5.0]
  def change
    remove_column :bitcoin_network_transactions, :address
    remove_column :bitcoin_network_transactions, :deposit_bitcoin_address_id
  end
end
