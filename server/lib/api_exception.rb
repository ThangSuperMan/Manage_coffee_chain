module ApiException
  EXCEPTIONS = {
    #400
    "ActiveRecord::RecordInvalid" => { status: 400, message: 'Invalid request' },
    "BadRequest" => { status: 400, message: 'Bad request' },

    #403
    "Forbidden" => { status: 403, message: "Your own message in here" },

    #404
    "ActiveRecord::RecordNotFound" => { status: 404, message: "Cannot find record" },
    "NotFound" => {status: 404, message: "Your own message in here"}
  }

  class BaseError < StandardError
    attr_reader :status_code, :error_code, :message
    def initialize(msg = nil)
      @message = msg
    end
  end

  module Handler
    def self.included(klass)
      klass.class_eval do
        EXCEPTIONS.each do |exception_name, context|
          unless ApiException.const_defined?(exception_name)
            ApiException.const_set(exception_name, Class.new(BaseError))
            exception_name = "ApiException::#{exception_name}"
          end

          rescue_from exception_name do |exeption|
            render json: {
              message: context[:message],
              detail: exception.message
            }.compact,
            status: context[:status]
          end
        end

        private

        def doorkeeper_unauthorized_render_options(error: nil)
          {
            json: {
              message: 'Unauthorized',
              detail: error.try(:description) || 'Access token is invalid or has expired'
            }
          }
        end
      end
    end
  end
end
