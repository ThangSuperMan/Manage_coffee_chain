class Api::V1::BookmarksController < Api::V1::BaseController
  before_action :set_bookmark, only: [:show]
  before_action :doorkeeper_authorize!, except: [:index]

  def index
    @bookmarks = Bookmark.all

    render json: @bookmarks
  end

  def show
    render json: @bookmark
  end

  # POST /bookmarks
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
