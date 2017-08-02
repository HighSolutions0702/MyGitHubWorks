class CreateTrade < ActiveRecord::Migration[5.0]
  def change
    create_table :trades do |t|
      t.decimal :price, precision: 36, scale: 18
      t.decimal :volume, precision: 36, scale: 18
      t.integer :order_left_id
      t.integer :order_right_id
    end
  end
end
