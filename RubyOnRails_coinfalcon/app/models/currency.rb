# == Schema Information
#
# Table name: currencies
#
#  id         :integer          not null, primary key
#  code       :string
#  name       :string
#  created_at :datetime
#  updated_at :datetime
#

class Currency < ApplicationRecord
  has_many :orders, :foreign_key => 'cur_bid_id', :class_name => 'Order'
  has_many :orders, :foreign_key => 'cur_ask_id', :class_name => 'Order'

  class << self
    def eur_id
      Currency.find_by_code('eur').id
    end
    def btc_id
      Currency.find_by_code('btc').id
    end
    def eth_id
      Currency.find_by_code('eth').id
    end
  end
end
