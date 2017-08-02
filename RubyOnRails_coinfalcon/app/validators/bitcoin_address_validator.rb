class BitcoinAddressValidator < ActiveModel::Validator

  def validate(record)
    field_name = options[:field_name] || :bitcoin_address
    value = record.send(field_name).to_s

    unless Bitcoin::valid_address?(value)
      record.errors.add(field_name, :invalid, message: options[:message])
    end
  end
end
