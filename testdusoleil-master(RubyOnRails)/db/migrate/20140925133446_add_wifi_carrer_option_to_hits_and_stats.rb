class AddWifiCarrerOptionToHitsAndStats < ActiveRecord::Migration
  def self.up
    add_column :hits, :blocked_wifi_carrier, :boolean, default: false, :null => false
    add_column :stats, :blocked_wifi_carrier, :integer, default: 0, :null => false
  end

  def self.down
    remove_column :hits, :blocked_wifi_carrier
    remove_column :stats, :blocked_wifi_carrier
  end
end
