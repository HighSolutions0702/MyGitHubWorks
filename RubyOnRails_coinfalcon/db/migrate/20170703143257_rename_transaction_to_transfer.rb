class RenameTransactionToTransfer < ActiveRecord::Migration[5.0]
  def change
    rename_table :transactions, :transfers
    rename_column :transfers, :transaction_type, :transfer_type
    rename_column :bitcoin_network_transactions, :transaction_id, :transfer_id
  end
end
