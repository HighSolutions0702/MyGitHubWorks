# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener 'turbolinks:load', ->
  $('#user_time_zone').select2()
  $('#user_language_id').select2({
    minimumResultsForSearch: -1
  })
  $('[id^=edit_user_]').each ->
    $(this).validate()
