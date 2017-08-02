class AddAddressTypeAndIdToTransactions < ActiveRecord::Migration[5.0]
  def change
    add_column :transactions, :address_type, :string
    add_column :transactions, :address_id, :integer
  end
end
