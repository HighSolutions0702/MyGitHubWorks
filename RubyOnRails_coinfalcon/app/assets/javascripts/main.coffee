document.addEventListener 'turbolinks:load', ->
  window.flashTitle = (pageTitle, newMessageTitle) ->
    if document.title == pageTitle
      document.title = newMessageTitle
    else
      document.title = pageTitle
    return

  $('#notifications').on 'click', '.single_notification', ->
    window.clearInterval($(this).attr('interval_id'))