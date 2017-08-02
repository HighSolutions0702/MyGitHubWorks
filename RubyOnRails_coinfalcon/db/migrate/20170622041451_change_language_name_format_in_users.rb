class ChangeLanguageNameFormatInUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :language
    add_column :users, :language_id, :integer
  end
end
