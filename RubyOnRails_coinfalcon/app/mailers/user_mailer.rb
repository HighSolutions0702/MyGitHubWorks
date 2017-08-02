class UserMailer < ApplicationMailer
  def enable_otp(user, enable_otp_token)
    @enable_otp_token = enable_otp_token
    #mail(to: 'dilin.life@gmail.com', subject: 'enable two factor login')
    mail(to: user.email, subject: 'enable two factor login')
  end

  def deposit_success(user)
    mail(to: user.email, subject: 'Deposit confirmed')
  end
end
