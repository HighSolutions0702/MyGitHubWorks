# == Schema Information
#
# Table name: transfers
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  amount        :decimal(36, 18)
#  reject_reason :string
#  processed_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  currency_id   :integer
#  transfer_type :integer
#  address_type  :string
#  address_id    :integer
#  status        :string
#

class Transfer < ApplicationRecord
  belongs_to :bank_account
  belongs_to :currency
  belongs_to :user
  belongs_to :address, :polymorphic => true

  attr_accessor :bitcoin_address

  has_one :bitcoin_network_transaction

  delegate :code, to: :currency, prefix: true
  delegate :email, to: :user, prefix: true
  enum transfer_type: [:deposit, :withdraw]

  scope :withdraw, -> {where(transfer_type: 'withdraw')}
  scope :deposit, -> {where(transfer_type: 'deposit')}


  after_create :update_user_amount

  aasm column: :status do
    state :pending, :initial => true
    state :denied, :completed

    event :deny do
      transitions :from => :pending, :to => :denied
    end

    event :complete do
      transitions :from => :pending, :to => :completed
    end

  end

  def display_status
    if self.address.instance_of?(DepositBitcoinAddress) && !self.completed?
      "Need #{self.bitcoin_network_transaction.rest_confirmations} confirmations"
    else
      self.status
    end
  end

  def address_display_name
    if self.address.instance_of?(WithdrawBitcoinAddress) || self.address.instance_of?(DepositBitcoinAddress)
      self.bitcoin_network_transaction.display_name
    else
      self.address.display_name
    end
  end

  def update_user_amount
    ap 'in update user_amount'
    if self.transfer_type == 'withdraw' && self.pending?
      if self.address.instance_of? WithdrawBitcoinAddress
        ap self
        ap self.address
        self.bitcoin_network_transaction = BitcoinNetworkTransaction.create!(transfer_id: self.id, amount: self.amount)
      end
      currency_sum = "#{currency_code}_sum"
      user.update_attribute( currency_sum, user.send(currency_sum.to_sym) - self.amount)
    elsif self.transfer_type == 'deposit'
    end
  end

end