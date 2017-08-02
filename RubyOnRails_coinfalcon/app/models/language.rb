# == Schema Information
#
# Table name: languages
#
#  id         :integer          not null, primary key
#  language   :string
#  code       :string
#  created_at :datetime
#  updated_at :datetime
#

class Language < ApplicationRecord
end
