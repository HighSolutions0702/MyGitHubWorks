class AddTypeToBitcoinAddress < ActiveRecord::Migration[5.0]
  def change
    add_column :bitcoin_addresses, :type, :string
  end
end
