# == Schema Information
#
# Table name: users
#
#  id                        :integer          not null, primary key
#  email                     :string           default(""), not null
#  encrypted_password        :string           default(""), not null
#  reset_password_token      :string
#  reset_password_sent_at    :datetime
#  remember_created_at       :datetime
#  sign_in_count             :integer          default(0), not null
#  current_sign_in_at        :datetime
#  last_sign_in_at           :datetime
#  current_sign_in_ip        :inet
#  last_sign_in_ip           :inet
#  confirmation_token        :string
#  confirmed_at              :datetime
#  confirmation_sent_at      :datetime
#  unconfirmed_email         :string
#  failed_attempts           :integer          default(0), not null
#  unlock_token              :string
#  locked_at                 :datetime
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  time_zone                 :string
#  language_id               :integer
#  encrypted_otp_secret      :string
#  encrypted_otp_secret_iv   :string
#  encrypted_otp_secret_salt :string
#  consumed_timestep         :integer
#  otp_required_for_login    :boolean
#  reference                 :string
#  eur_sum                   :decimal(9, 2)    default(0.0)
#  btc_sum                   :decimal(16, 8)   default(0.0)
#  eth_sum                   :decimal(36, 18)  default(0.0)
#

class User < ApplicationRecord
  devise :two_factor_authenticatable,
         :otp_secret_encryption_key => ENV['OPT_ENCRYPTION_KEY']

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  has_many :bank_accounts
  has_many :transfers
  has_many :chats
  has_many :withdraw_euro_transfers, -> {where(transfer_type: 'withdraw', currency_id: Currency.eur_id)}, class_name: 'Transfer'
  has_many :withdraw_bitcoin_transfers, -> {where(transfer_type: 'withdraw', currency_id: Currency.btc_id)}, class_name: 'Transfer'
  has_many :withdraw_transfers, -> {where(transfer_type: 'withdraw')}, class_name: 'Transfer'
  has_many :deposit_bitcoin_transfers, -> {where(transfer_type: 'deposit', currency_id: Currency.btc_id)}, class_name: 'Transfer'
  has_many :deposit_transfers, -> {where(transfer_type: 'deposit')}, class_name: 'Transfer'
  has_many :deposit_bitcoin_addresses
  has_one :latest_deposit_bitcoin_address, -> { order updated_at: :desc },  class_name: 'DepositBitcoinAddress'
  has_many :currencies, through: :transfers
  belongs_to :language

  before_save :set_reference

  def next_assign_address_date
    latest_deposit_bitcoin_address.nil? ? Time.now : latest_deposit_bitcoin_address.updated_at + 24.hours
  end

  def can_assign_address?
    latest_deposit_bitcoin_address.nil? || Time.now >= next_assign_address_date
  end

  def set_reference
    if self.reference.nil?
      reference = 'CFJS' + random_strings(8)
      while User.find_by_reference(reference).present?
        reference = 'CFJS' + random_strings(8)
      end
      self.reference = reference
    end
  end

  def random_strings(num)
    chars = ('A'..'Z').to_a - ['L', 'I', 'O']
    (0...num).map { chars.to_a[rand(23)] }.join
  end

  def unauthenticated_message
    if @failed_otp
      :invalid_otp
    else
      super
    end
  end

  def validate_and_consume_otp!(code, options = {})
    @failed_otp = !super(code, options)
    return !@failed_otp
  end

  private
  @failed_otp = false

end
