class CreateOrder < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.string :status
      t.decimal :price, precision: 36, scale: 18
      t.decimal :volume, precision: 36, scale: 18
      t.decimal :volume_filled, precision: 36, scale: 18
      t.integer :cur_bid_id
      t.integer :cur_ask_id
    end
  end
end
