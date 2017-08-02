# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener 'turbolinks:load', ->
  $('#NewBankAccountModal').on "ajax:success", (e,data,status,xhr)  ->
    if data['success']
      window.location = '/transfers/withdraw/euro'
    else
      $('#bank_account_tips').text(data['message']).removeClass('hidden')

