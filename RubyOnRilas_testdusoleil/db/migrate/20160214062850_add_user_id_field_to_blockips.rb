class AddUserIdFieldToBlockips < ActiveRecord::Migration
  def self.up
    add_column :blockips, :user_id, :integer
  end

  def self.down
    remove_column :blockips, :user_id
  end
end
