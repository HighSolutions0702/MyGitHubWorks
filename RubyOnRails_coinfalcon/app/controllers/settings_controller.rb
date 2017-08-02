class SettingsController < ApplicationController

  before_action :authenticate_user!

  def account
    @user = current_user
  end

  def security
    @user = current_user
    if @user.otp_secret.nil?
      @user.otp_secret = User.generate_otp_secret
      @user.save!
    end
  end

  def account_update
    @user = current_user
    if current_user.update(account_update_params)
      flash[:success] = "Account settings changed"
      redirect_to :controller => 'settings', :action => 'account'
    else
      flash.now[:danger] = @user.errors.full_messages.join("")
    end
  end

  def email_update
    @user = User.find(current_user.id)
    if @user.update_with_password(email_update_params)
      bypass_sign_in(@user)
      flash.now[:success] = "Email changed successfully"
      render "settings/security"
    else
      flash.now[:danger] = @user.errors.full_messages.join("")
      render "settings/security"
    end
  end

  def password_update
    @user = User.find(current_user.id)
    if @user.otp_required_for_login && !@otp_verified
      #for this situation, we need return json, and not update password directly, just check
      if !@user.valid_password?(password_update_params[:current_password])
        return render_fail('current password not correct!', {current_step: 'check_password'})
      elsif password_update_params[:password] != password_update_params[:password_confirmation]
        return render_fail('new password and password confirmation are not same!', {current_step: 'check_password'})
      else
        flash.now[:success] = "Password changed successfully"
        render_success({current_step: 'check_password'})
      end
    else
      if @user.update_with_password(password_update_params)

        if @user.otp_required_for_login
          flash[:success] = "Password changed successfully"
          render_success( {redirct_url: settings_security_url, current_step: '2factor'})
        else
          bypass_sign_in(@user)
          flash.now[:success] = "Password changed successfully"
          render "settings/security"
        end
      else
        if @user.otp_required_for_login
          render_fail( @user.errors.full_messages.join(""), {current_step: '2factor'})
        else
          flash.now[:danger] = @user.errors.full_messages.join("")
          render "settings/security"
        end

        end
    end

  end

  private
    def account_update_params
      params.require(:user).permit(:language_id, :time_zone)
    end

    def email_update_params
      params.require(:user).permit(:email, :current_password)
    end

    def password_update_params
      params.require(:user).permit(:password, :password_confirmation, :current_password, :otp_attempt)
    end
end
