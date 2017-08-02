class AddCurrenciesToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :eur_sum, :decimal, precision: 9, scale: 2, :default => 0
    add_column :users, :btc_sum, :decimal, precision: 16, scale: 8, :default => 0
    add_column :users, :eth_sum, :decimal, precision: 36, scale: 18, :default => 0
  end
end
