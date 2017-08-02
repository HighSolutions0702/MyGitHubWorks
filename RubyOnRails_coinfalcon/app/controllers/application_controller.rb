class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  add_flash_types :success, :danger
  before_action :set_locale
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :verify_user_otp_attempt!
  before_action :load_chat

  def verify_user_otp_attempt!
    @otp_attempt = params.fetch(:user, {})[:otp_attempt]
    @user = current_user.present?? current_user : User.find_by_email(params.fetch(:user, {})[:email])
    gon.otp_enabled = @user.otp_required_for_login if @user.present?
    @otp_verified = false
    unless @otp_attempt.nil?
      ap @user.current_otp
      ap @otp_attempt
      ap @user.validate_and_consume_otp!(@otp_attempt)
      if @user.current_otp != @otp_attempt
        render_fail(t('otp_not_match'), {current_step: '2factor'})
        return
      end
      @otp_verified = true
    end
  end

  def load_chat
    @chats = Chat.all
    @chat_message = Chat.new
  end

  def set_locale
    I18n.locale = I18n.default_locale
    if user_signed_in?
      user = current_user
      if user.try(:language_id)
        language = Language.find(user.language_id)
        I18n.locale = language.code
      else
        logger.debug "* User-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
        check_language_exists(user)
      end
    else
      check_language_exists
    end
  end

  def application
  end

  def flatten_errors(errors)
    errors.inject({}) { |res, (k,v)| res[k] = v.first; res }
  end

  def render_success(data = {}, msg = nil)
    render :json => {
        success: true,
        message: msg.to_s
    }.merge(data)
  end

  def render_fail(msg = nil, model = nil)
    res = {
        success: false,
        message: msg.to_s,
    }

    if model
      if model.kind_of?(Hash)
        res.merge!(model)
      else
        res.merge!( errors: flatten_errors(model.errors.messages) )
      end
    end

    render :json => res
  end

  private
    def extract_locale_from_accept_language_header
      accept_language = (request.env['HTTP_ACCEPT_LANGUAGE'] || 'en').scan(/^[a-z]{2}/).first
    end

    def check_language_exists(user = nil)
      language = Language.where(:code => extract_locale_from_accept_language_header).first
      if language
        I18n.locale = extract_locale_from_accept_language_header
        if user
          user.update({"language_id" => language.id})
        end
        logger.debug "* Locale set to '#{I18n.locale}'"
      else
        if user
          user.update({"language_id" => 1})
        end
      end
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_in, keys: [:otp_attempt])
    end
end
