require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module CoffeeChain
  class Application < Rails::Application
    config.load_defaults 6.1

    config.hosts << "https://290d-171-252-189-0.ngrok-free.app"

    config.autoload_paths += %W(
      #{config.root}/lib
      #{config.root}/app/services
    )

    config.api_only = true
  end
end
