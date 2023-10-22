# frozen_string_literal: true

Doorkeeper.configure do
  orm :active_record

  resource_owner_from_credentials do |_routes|
    User.authenticate(params[:email], params[:password])
  end

  use_refresh_token

  # enable password grant
  grant_flows %w[password]

  allow_blank_redirect_uri true

  skip_authorization do
    true
  end

  access_token_expires_in 2.hours
end
