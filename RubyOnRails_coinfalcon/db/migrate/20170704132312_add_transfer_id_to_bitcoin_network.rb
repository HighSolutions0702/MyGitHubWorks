class AddTransferIdToBitcoinNetwork < ActiveRecord::Migration[5.0]
  def change
    add_column :bitcoin_network_transactions, :transfer_id, :integer
  end
end
