require_relative 'helpers'

module API
  module V1
    class Mount < Grape::API

      cascade false

      format :json
      default_format :json

      helpers ::API::V1::Helpers

      do_not_route_options!

      mount API::V1::Transfers

      insert_after Grape::Middleware::Formatter, Grape::Middleware::Logger

      # include Constraints

      before do
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        Rails.logger.info "#{env['REQUEST_METHOD']} #{env['PATH_INFO']} #{env['QUERY_STRING']}"
      end


    end
  end
end
