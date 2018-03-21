require "lib/image_helpers"
helpers ImageHelpers

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
set :base_url, "/"
set :ga, "UA-116133123-1"
set :css_dir, 'source/stylesheets'
set :js_dir, 'source/javascripts'
set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # Enable cache buster (except for images)
  activate :relative_assets
  activate :asset_hash, ignore: [/\.jpg\Z/, /\.png\Z/]
  set :base_url, "/portfolio/"
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
end
