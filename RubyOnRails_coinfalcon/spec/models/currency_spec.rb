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

require 'rails_helper'

RSpec.describe Currency, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
