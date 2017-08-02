require_relative 'boot'

require 'rails/all'
require 'bitcoin'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module CoinFalcon
  class Application < Rails::Application
    config.assets.paths << File.join(Rails.root, "/vendor/pages")
    config.serve_static_assets = true
    config.autoload_paths += Dir["#{Rails.root}/app"]
    config.autoload_paths += Dir["#{Rails.root}/lib"]
    config.paths.add File.join('app', 'api'), glob: File.join('**', '*.rb')
    config.autoload_paths += Dir[Rails.root.join('app', 'api', '*')]
    config.autoload_paths += Dir[Rails.root.join('app', 'api', 'v1', '*')]

    config.exceptions_app = self.routes
  end
end
