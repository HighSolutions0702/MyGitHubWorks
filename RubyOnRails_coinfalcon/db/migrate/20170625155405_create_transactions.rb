class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.decimal :amount, precision: 36, scale: 18
      t.integer :type
      t.boolean :reject
      t.string :reject_reason
      t.integer :bankAccountId
      t.datetime :processed_at

      t.timestamps
    end
  end
end
