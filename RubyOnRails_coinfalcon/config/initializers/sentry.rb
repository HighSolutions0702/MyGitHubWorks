Raven.configure do |config|
  if ENV["SENTRY_URI"]
    config.dsn = ENV["SENTRY_URI"]
    config.environments = ['staging', 'production']
  end
end
