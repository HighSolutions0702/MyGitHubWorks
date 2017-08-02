class BicValidator < ActiveModel::Validator
  # AnyBICIdentifier (taken from schema)
  REGEX = /\A[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}\z/

  def validate(record)
    field_name = options[:field_name] || :bic
    value = record.send(field_name)

    if value
      unless value.to_s.match(REGEX)
        record.errors.add(field_name, :invalid, message: options[:message])
      end
    end
  end
end

