class CreateBitcoinNetworkTransaction < ActiveRecord::Migration[5.0]
  def change
    create_table :bitcoin_network_transactions do |t|
      t.string :address
      t.decimal :amount, precision: 14, scale: 8
      t.integer :confirmations
      t.string :txid
    end
  end
end
