if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create(name: 'IOS client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create(name: 'Android client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create(name: 'React', redirect_uri: '', scopes: '')
end

if Bookmark.count.zero?
  Bookmark.create(title: 'Google', url: 'https://www.google.com')
  Bookmark.create(title: 'Youtube', url: 'https://youube.com')
end
