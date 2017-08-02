# == Schema Information
#
# Table name: bank_accounts
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  iban       :string
#  bic        :string
#  name       :string
#  deleted    :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BankAccount < ApplicationRecord
  belongs_to :user
  has_many :transfers, :as => :address
  alias_attribute :address, :iban

  before_validation :remove_iban_whitespaces

  validates :iban, iban: true, presence: true
  validates_uniqueness_of :iban, message: "is already connected to another account"
  validates :bic, bic: true, presence: true

  def display_name
    "#{self.name} ....#{self.iban.last(4)}"
  end

  def remove_iban_whitespaces
    self.iban.gsub!(/\s/, '')
  end
end
