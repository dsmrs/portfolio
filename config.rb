page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
#
# Use webpack for assets
#
activate :external_pipeline,
         name: :webpack,
         command: build? ?  "yarn run build" : "yarn run start",
         source: ".tmp/dist",
         latency: 1

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

set :css_dir, 'source/stylesheets'
set :js_dir, 'source/javascripts'
set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # Enable cache buster (except for images)
  activate :asset_hash, ignore: [/\.jpg\Z/, /\.png\Z/]
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
end
