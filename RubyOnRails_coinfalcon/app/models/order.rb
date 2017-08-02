# == Schema Information
#
# Table name: orders
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  status        :string
#  price         :decimal(36, 18)
#  volume        :decimal(36, 18)
#  volume_filled :decimal(36, 18)
#  cur_bid_id    :integer
#  cur_ask_id    :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class Order < ApplicationRecord
  has_many :trades, :foreign_key => 'order_left_id'
  has_many :trades, :foreign_key => 'order_right_id'

  belongs_to :cur_bid, foreign_key: :cur_bid_id, :class_name => 'Currency'
  belongs_to :cur_ask, foreign_key: :cur_ask_id, :class_name => 'Currency'
  belongs_to :user

  enum status: [:open, :fulfilled, :partially_filled, :closed, :canceled]

  class << self

  end
end
