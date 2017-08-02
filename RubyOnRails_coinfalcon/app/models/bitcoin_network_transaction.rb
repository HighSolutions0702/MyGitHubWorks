# == Schema Information
#
# Table name: bitcoin_network_transactions
#
#  id            :integer          not null, primary key
#  amount        :decimal(14, 8)
#  confirmations :integer          default(0)
#  txid          :string
#  created_at    :datetime
#  updated_at    :datetime
#  transfer_id   :integer
#

class BitcoinNetworkTransaction < ApplicationRecord

  belongs_to :deposit_bitcoin_address
  belongs_to :transfer
  delegate :address, to: :transfer

  def display_name
    self.txid.present? ? "TX: #{self.txid.first(15)}.." : ""
  end

  def notify_bitcoin_server
    response = RestClient.post URI.join(ENV['BITCOIN_SERVER_API_HOST'], 'new_withdraw').to_s, {id: self.id}
    ap response
  end

  def rest_confirmations
    Setting.btc_confirmation - self.confirmations
  end

end