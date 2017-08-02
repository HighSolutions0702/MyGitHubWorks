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

require 'rails_helper'

RSpec.describe Transaction, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
