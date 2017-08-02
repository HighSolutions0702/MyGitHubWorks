# == Schema Information
#
# Table name: trades
#
#  id             :integer          not null, primary key
#  price          :decimal(36, 18)
#  volume         :decimal(36, 18)
#  order_left_id  :integer
#  order_right_id :integer
#  created_at     :datetime
#  updated_at     :datetime
#

class Trade < ApplicationRecord
  belongs_to :order_left, :class_name => 'Order'
  belongs_to :order_right, :class_name => 'Order'
end
