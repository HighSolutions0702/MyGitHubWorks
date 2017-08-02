# == Schema Information
#
# Table name: transactions
#
#  id               :integer          not null, primary key
#  user_id          :integer
#  amount           :decimal(36, 18)
#  reject_reason    :string
#  processed_at     :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  currency_id      :integer
#  transaction_type :integer
#  address_type     :string
#  address_id       :integer
#  status           :string
#

FactoryGirl.define do
  factory :transaction do
    user_id 1
    amount "9.99"
    type 1
    reject false
    reject_reason "MyString"
    bankAccountId 1
    processed_at "2017-06-25 23:54:06"
  end
end
