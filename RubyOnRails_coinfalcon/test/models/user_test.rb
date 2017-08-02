# == Schema Information
#
# Table name: users
#
#  id                        :integer          not null, primary key
#  email                     :string           default(""), not null
#  encrypted_password        :string           default(""), not null
#  reset_password_token      :string
#  reset_password_sent_at    :datetime
#  remember_created_at       :datetime
#  sign_in_count             :integer          default(0), not null
#  current_sign_in_at        :datetime
#  last_sign_in_at           :datetime
#  current_sign_in_ip        :inet
#  last_sign_in_ip           :inet
#  confirmation_token        :string
#  confirmed_at              :datetime
#  confirmation_sent_at      :datetime
#  unconfirmed_email         :string
#  failed_attempts           :integer          default(0), not null
#  unlock_token              :string
#  locked_at                 :datetime
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  time_zone                 :string
#  language_id               :integer
#  encrypted_otp_secret      :string
#  encrypted_otp_secret_iv   :string
#  encrypted_otp_secret_salt :string
#  consumed_timestep         :integer
#  otp_required_for_login    :boolean
#  reference                 :string
#  eur_sum                   :decimal(9, 2)    default(0.0)
#  btc_sum                   :decimal(16, 8)   default(0.0)
#  eth_sum                   :decimal(36, 18)  default(0.0)
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
