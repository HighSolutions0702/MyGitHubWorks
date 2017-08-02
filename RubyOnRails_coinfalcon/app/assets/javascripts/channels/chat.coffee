document.addEventListener 'turbolinks:load', ->
  App.chat = App.cable.subscriptions.create "ChatChannel",
    received: (data) ->
      console.log(data)
      if data.type == 'subscribe' || data.type == 'unsubscribe'
        $('.user_count').html(data.count)
      if data.type == 'message'
        $('#chat').append '<div class="chat-body">' + data.body + '</div>'
    send_message: (message) ->
      @perform 'send_message', message: message

  $('#new_chat').submit (e) ->
    e.preventDefault()

  $('#new_chat').keyup (e) ->
    if e.keyCode == 13
      $this = $(this)
      textarea = $this.find('#chat_body')
      if $.trim(textarea.val()).length > 1
        data =
          message: textarea.val()
          type: 'message'
        App.chat.send_message data
        textarea.val('')
    return false

  wrap = $('.chat')
  $(window).on 'scroll', (e) ->
    if $('body').scrollTop() > 59
      wrap.addClass 'chat-fixed'
    else
      wrap.removeClass 'chat-fixed'
    return
