# if there is no OAuth application created, create them

if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create(name: 'IOS client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create(name: 'Android client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create(name: 'React', redirect_uri: '', scopes: '')
end

# if User.count.zero?
#   User.create(email: 'thangdevops@gmail.com', passw)
# end
