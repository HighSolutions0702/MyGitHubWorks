class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'ChatChannel'
    Setting.chat_active_user = Setting.chat_active_user.to_i + 1
    ActionCable.server.broadcast('ChatChannel', {type: 'subscribe', count: Setting.chat_active_user})
  end

  def unsubscribed
    Setting.chat_active_user = Setting.chat_active_user.to_i - 1
    ActionCable.server.broadcast('ChatChannel', {type: 'subscribe', count: Setting.chat_active_user})
  end

  def send_message(data)
    if data['message']['type'] == 'message'
      current_user.chats.create!(body: data['message']['message'])
    end
  end
end