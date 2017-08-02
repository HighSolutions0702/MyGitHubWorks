# == Schema Information
#
# Table name: deposit_bitcoin_addresses
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  address    :string
#  created_at :datetime
#  updated_at :datetime
#

class DepositBitcoinAddress < ApplicationRecord
  has_many :transfers, :as =>  :address
  has_many :bitcoin_network_transactions
  belongs_to :user

  validates_uniqueness_of :address

  scope :unassigned, -> {where(user_id: nil).order(created_at: :asc)}

  class << self
    def single_unassigned
      DepositBitcoinAddress.unassigned.first
    end
  end

end
