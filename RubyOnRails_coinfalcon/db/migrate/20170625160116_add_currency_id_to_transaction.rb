class AddCurrencyIdToTransaction < ActiveRecord::Migration[5.0]
  def change
    add_column :transactions, :currency_id, :integer
  end
end
