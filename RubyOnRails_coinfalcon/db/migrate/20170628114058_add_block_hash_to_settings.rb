class AddBlockHashToSettings < ActiveRecord::Migration[5.0]
  def change
    add_column :settings, :block_hash, :string
  end
end
