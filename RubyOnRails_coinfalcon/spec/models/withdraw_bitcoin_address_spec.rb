# == Schema Information
#
# Table name: withdraw_bitcoin_addresses
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#  address    :string
#

require 'rails_helper'

RSpec.describe WithdrawBitcoinAddress, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
