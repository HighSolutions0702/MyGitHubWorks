App.notifications = App.cable.subscriptions.create "NotificationChannel",
  received: (data) ->
    $('#notifications').prepend(data['notification'])
    interval_id = setInterval "flashTitle('CoinFalcon', '" + data['title'] + "')", 2000
    $('#notifications .single_notification:first').attr('interval_id', interval_id)
    $('#histories_container.deposits_bitcoin').html(data['histories'])
    $('#balance_header_container').html(data['balance_header'])
