class AddColumnToWithdrawBitcoinAddress < ActiveRecord::Migration[5.0]
  def change
    remove_column :bitcoin_addresses, :address_type
    add_column :withdraw_bitcoin_addresses, :user_id, :integer
    add_column :withdraw_bitcoin_addresses, :address, :string
    rename_table :bitcoin_addresses, :deposit_bitcoin_addresses
  end
end
