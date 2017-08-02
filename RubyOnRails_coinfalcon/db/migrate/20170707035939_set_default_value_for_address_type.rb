class SetDefaultValueForAddressType < ActiveRecord::Migration[5.0]
  def change
    remove_column :bitcoin_addresses, :type
    add_column :bitcoin_addresses, :address_type, :integer, default: 0
  end
end
