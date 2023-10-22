module Api
  module V1
    class BookmarksController < Common::BaseController
      load_and_authorize_resource
      before_action :doorkeeper_authorize!, except: [:index]

      def index
        @bookmarks = Bookmark.all

        puts "Hello: #{ENV['BRAZE_API_URL']}"

        render json: @bookmarks
      end

      def show
        @bookmark = Bookmark.find(params[:id])
        Bookmark.create!
        render json: @bookmark
      end

      def create
        @bookmark = Bookmark.new(bookmark_params)

        if @bookmark.save
          render json: @bookmark, status: :created, location: @bookmark
        else
          render json: @bookmark.errors, status: :unprocessable_entity
        end
      end

      private

      def set_bookmark
        @bookmark = Bookmark.find(params[:id])
      end
    end
  end
end
