class AddStatusToTransaction < ActiveRecord::Migration[5.0]
  def change
    add_column :transactions, :status, :string
    remove_column :transactions, :rejected
  end
end
