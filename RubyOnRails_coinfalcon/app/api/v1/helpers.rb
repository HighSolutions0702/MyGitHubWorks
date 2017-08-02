module API
  module V1
    module Helpers

      def render_success(data = {}, msg = nil)
        status 200
        { success: true, message: msg.to_s, data: data}
      end

      def render_fail(msg = nil, data = {}, status = 400)
        status status
        { success: false, message: msg.to_s, data: data }
      end

      def render_view(name, locals = {})
        ApplicationController.renderer.render(partial: name, locals: locals)
      end

    end
  end
end