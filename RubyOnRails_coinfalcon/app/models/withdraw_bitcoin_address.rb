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

class WithdrawBitcoinAddress < ApplicationRecord
end