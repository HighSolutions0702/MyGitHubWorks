class ChangeRejactInTransactions < ActiveRecord::Migration[5.0]
  def change
    remove_column :transactions, :reject
    add_column :transactions, :rejected, :string
  end
end
