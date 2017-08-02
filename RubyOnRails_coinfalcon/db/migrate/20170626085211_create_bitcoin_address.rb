class CreateBitcoinAddress < ActiveRecord::Migration[5.0]
  def change
    create_table :bitcoin_addresses do |t|
      t.integer :user_id
      t.string :address
    end
  end
end
