# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener 'turbolinks:load', ->
  $("#deposit_address_container").on 'click', "#new_deposit_address", ->
    href = '/transfers/deposit/new_bitcoin_address'
    $.get href, (data)->
      $('#deposit_address_container').html(data)
