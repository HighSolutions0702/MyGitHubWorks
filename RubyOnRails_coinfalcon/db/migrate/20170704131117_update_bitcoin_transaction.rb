class UpdateBitcoinTransaction < ActiveRecord::Migration[5.0]
  def change
    add_column :bitcoin_network_transactions, :bitcoin_address_id, :integer
    remove_column :bitcoin_network_transactions, :transfer_id
  end
end
