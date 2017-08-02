# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener 'turbolinks:load', ->

  $('#left_currency').change ->
    gon.order_data['left_currency'] = $(this).val()

  $('#order_type').change ->
    gon.order_data['order_type'] = $(this).val()

  $('#view-current-otp').click ->
    $('#current-otp').show()

  $('#disable-otp-form').on "ajax:success", (e,data,status,xhr)  ->
    if data['success']
      window.location = '/settings/security'
    else
      $('#disable-otp-form #otp_not_match_tip').text(data['message']).show()

  $('#enable-otp-form').on "ajax:success", (e,data,status,xhr)  ->
    if data['success']
      $('#TurnOnFactorAuthModal').modal('hide')
      $('#CheckOtpEmailModal').modal('show')
      #window.location = data['redirect_url']
    else
      $('#enable-otp-form #otp_not_match_tip').text(data['message']).show()

  $('#new_user').on "ajax:success", (e,data,status,xhr)  ->
    if typeof(data) == 'object' && !data['success']
      $('#otp_not_match_tip').text(data['message']).show()

  $('.modal').on 'shown.bs.modal', ->
    $(this).find('[autofocus]').focus();

  $('#new_user').bind 'keypress', (e) ->
    if e.keyCode == 13
      if !$('#LoginFactorAuthModal').is(':visible')
        e.preventDefault();
        $('#login-without-otp').click()
    return

  $('#password_update_form').bind 'submit', (e) ->
    if gon.otp_enabled && !$('#PasswordUpdateFactorAuthModal').is(':visible')
      $('input[name="user[otp_attempt]"]').prop('disabled', true);
      console.log('disabled')

    return

  $('#password_update_form').on "ajax:success", (e,data,status,xhr)  ->
    console.log(data)
    if data['current_step'] == '2factor'
      if data['success']
        console.log data
        window.location = '/settings/security'
      else
        $('#PasswordUpdateFactorAuthModal #otp_not_match_tip').text(data['message']).show()
    else
      if data['success']
        $('#PasswordUpdateFactorAuthModal').modal('show')
        $('input[name="user[otp_attempt]"]').prop('disabled', false);
      else
        $('#password_update_error_tip').text(data['message']).show()


  $('#login-without-otp').click ->
    $.ajax
      url: '/users/login_without_otp'
      type: 'POST'
      dataType: 'json'
      data: {email: $('#user_email').val(), password: $('#user_password').val()}
      success: (json) ->
        if json.success
          if json.otp_enabled
            $('#login_without_otp_alert').addClass('hidden')
            $('#LoginFactorAuthModal').modal('show')
          else
            window.location = json.redirect_url
        else
          $('#login_without_otp_alert').text(json['message']).removeClass('hidden')
      error: (XMLHttpRequest, textStatus, errorThrown) ->
        if errorThrown == "Unauthorized"
          $('#login_without_otp_alert').text('You have to confirm your email address before continuing.').removeClass('hidden')

