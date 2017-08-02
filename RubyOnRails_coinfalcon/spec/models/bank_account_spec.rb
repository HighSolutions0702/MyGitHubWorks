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

require 'rails_helper'

RSpec.describe BankAccount, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
