class UsersController < ApplicationController
  before_action :verify_enable_otp_token!, only: [:enable_otp]
  before_action :authenticate_user!, except: [:login_without_otp]

  def login_without_otp
    ap params
    user = User.find_by_email(params[:email])
    if user.present?
      if user.valid_password?(params[:password])
        if user.otp_required_for_login
          render_success({otp_enabled: true})
        else
          sign_in user
          render_success(otp_enabled: false, redirect_url: '/')
        end
      else
        user.valid_for_authentication?{ false }
        if user.reload.access_locked?
          render_fail(t('devise.failure.locked'))
        else
          render_fail(t('devise.failure.invalid', authentication_keys: 'email'))
        end

      end
    else
      render_fail(t('devise.failure.invalid', authentication_keys: 'email'))
    end
  end

  def disable_otp
    current_user.otp_required_for_login = false
    current_user.otp_secret = nil
    current_user.save!
    flash[:success] = t('two_factor.disabled')
    render_success
  end

  def enable_otp
    ap current_user.otp_secret
    current_user.otp_required_for_login = true
    current_user.save!
    flash[:success] = t('two_factor.enabled')
    redirect_to settings_security_path
  end

  def sent_enable_otp_email
    ap params
    ap current_user.current_otp
    session[:enable_otp_token] = SecureRandom.uuid
    session[:enable_otp_token_expire_at] = 1.days.from_now
    UserMailer.enable_otp(current_user, session[:enable_otp_token]).deliver
    render_success({redirect_url: settings_security_path})
  end

  def verify_enable_otp_token!
    if params[:token] != session[:enable_otp_token]
      flash[:danger] = t('two_factor.enable_otp_token_not_match')
      redirect_to settings_security_path
    elsif session[:enable_otp_token_expire_at] <= Time.now
      flash[:danger] = t('two_factor.enable_otp_token_expire')
      redirect_to settings_security_path
    else
      session[:enable_otp_token_expire_at] = Time.now - 1
    end
  end

end
