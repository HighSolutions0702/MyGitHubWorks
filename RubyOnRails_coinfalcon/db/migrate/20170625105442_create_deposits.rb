class CreateDeposits < ActiveRecord::Migration[5.0]
  def change
    create_table :deposits do |t|
      t.integer :user_id
      t.decimal :amount, precision: 36, scale: 18
      t.string :currency_id
      t.boolean :rejected
      t.string :reject_reason

      t.timestamps
    end
  end
end
