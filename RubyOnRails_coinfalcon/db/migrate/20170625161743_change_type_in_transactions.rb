class ChangeTypeInTransactions < ActiveRecord::Migration[5.0]
  def change
    remove_column :transactions, :type
    add_column :transactions, :transaction_type, :integer
  end
end
