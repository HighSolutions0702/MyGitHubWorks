document.addEventListener 'turbolinks:load', ->
  $.validator.addMethod 'currency', ((value, element) ->
    @optional(element) or /^((\d{1,3}(\.(\d){3})*)|\d*)(,\d{1,2})?\s*$/.test(value)
  ), 'Please specify a valid amount'
