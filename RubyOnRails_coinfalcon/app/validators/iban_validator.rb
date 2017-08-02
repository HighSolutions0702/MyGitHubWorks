class IbanValidator < ActiveModel::Validator
  # IBAN2007Identifier (taken from schema)
  REGEX = /\A[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}\z/

  def validate(record)
    field_name = options[:field_name] || :iban
    value = record.send(field_name).to_s

    unless IBANTools::IBAN.valid?(value) && value.match(REGEX)
      record.errors.add(field_name, :invalid, message: options[:message])
    end
  end
end
