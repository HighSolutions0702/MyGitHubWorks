document.addEventListener 'turbolinks:load', ->
  $('.select2').select2()
  $('#new_transfer').on "ajax:success", (e,data,status,xhr)  ->
    if data['current_step'] == '2factor'
      if data['success']
        console.log data
        $('#WithdrawFactorAuthModal').modal('hide')
        $('#WithdrawSuccessModal').modal('show')
      else
        $('#WithdrawFactorAuthModal #otp_not_match_tip').text(data['message']).show()
    else
      if data['success']
        $('#WithdrawFactorAuthModal').modal('show')
        $('input[name="user[otp_attempt]"]').prop('disabled', false)
      else
        window.location = data['redirect_url']

  $.validator.addMethod 'btc', ((value, element) ->
    @optional(element) or /^0*(1?[0-9]|20)?[0-9]{0,6}(\.\d{1,8})?$/.test(value)
  ), 'Please specify a valid amount'

  console.log(gon.currency)
  if gon.currency == "btc"
    $('#new_transfer').validate rules: 'transfer[amount]': btc: true
  else
    $('#new_transfer').validate rules: 'transfer[amount]': currency: true


  $('#new_transfer').bind 'submit', (e) ->
    console.log('in new transfer submit')
    console.log gon
    if gon.otp_enabled && !$('#WithdrawFactorAuthModal').is(':visible')
      $('input[name="user[otp_attempt]"]').prop('disabled', true);
      console.log('disabled')

    return
