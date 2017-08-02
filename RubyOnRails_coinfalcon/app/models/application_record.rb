class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  include AASM
  default_scope { order(created_at: :desc) }
end
