# == Schema Information
#
# Table name: chats
#
#  id         :integer          not null, primary key
#  body       :text
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Chat < ApplicationRecord
  belongs_to :user
  after_create_commit { ActionCable.server.broadcast('ChatChannel', {type: 'message', body: self.body}) }
end