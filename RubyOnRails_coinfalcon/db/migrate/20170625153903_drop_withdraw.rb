class DropWithdraw < ActiveRecord::Migration[5.0]
  def change
    drop_table :withdraws
  end
end