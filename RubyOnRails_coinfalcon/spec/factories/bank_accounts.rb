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

FactoryGirl.define do
  factory :bank_account do
    user_id 1
    iban "MyString"
    bic "MyString"
    name "MyString"
    deleted false
  end
end
