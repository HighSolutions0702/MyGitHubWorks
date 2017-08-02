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

FactoryGirl.define do
  factory :currency do
    code "MyString"
    name "MyString"
  end
end
