class AddReferenceToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :reference, :string
  end
end
