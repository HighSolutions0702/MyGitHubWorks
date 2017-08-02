class AddTimestamps < ActiveRecord::Migration[5.0]
  def change
    add_column :bitcoin_addresses, :created_at, :datetime
    add_column :bitcoin_addresses, :updated_at, :datetime
    add_column :bitcoin_network_transactions, :created_at, :datetime
    add_column :bitcoin_network_transactions, :updated_at, :datetime
    add_column :currencies, :created_at, :datetime
    add_column :currencies, :updated_at, :datetime
    add_column :languages, :created_at, :datetime
    add_column :languages, :updated_at, :datetime
    add_column :orders, :created_at, :datetime
    add_column :orders, :updated_at, :datetime
    add_column :settings, :created_at, :datetime
    add_column :settings, :updated_at, :datetime
    add_column :trades, :created_at, :datetime
    add_column :trades, :updated_at, :datetime
  end
end
