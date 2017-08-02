class CreateWithdraws < ActiveRecord::Migration[5.0]
  def change
    create_table :withdraws do |t|
      t.integer :user_id
      t.decimal :amount, precision: 36, scale: 18
      t.string :currency_id
      t.datetime :processed
      t.boolean :rejected
      t.string :reject_reason

      t.timestamps
    end
  end
end
