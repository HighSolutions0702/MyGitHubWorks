class AddUniqueToAddress < ActiveRecord::Migration[5.0]
  def change
    add_index :bitcoin_addresses, [:address, :address_type], unique: true
  end
end
