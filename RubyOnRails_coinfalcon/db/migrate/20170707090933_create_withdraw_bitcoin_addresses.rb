class CreateWithdrawBitcoinAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :withdraw_bitcoin_addresses do |t|

      t.timestamps
    end
  end
end
