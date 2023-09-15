require "test_helper"

class BookmarksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bookmark = bookmarks(:one)
  end

  test "should get index" do
    get bookmarks_url, as: :json
    assert_response :success
  end

  test "should create bookmark" do
    assert_difference('Bookmark.count') do
      post bookmarks_url, params: { bookmark: { title: @bookmark.title, url: @bookmark.url } }, as: :json
    end

    assert_response 201
  end

  test "should show bookmark" do
    get bookmark_url(@bookmark), as: :json
    assert_response :success
  end

  test "should update bookmark" do
    patch bookmark_url(@bookmark), params: { bookmark: { title: @bookmark.title, url: @bookmark.url } }, as: :json
    assert_response 200
  end

  test "should destroy bookmark" do
    assert_difference('Bookmark.count', -1) do
      delete bookmark_url(@bookmark), as: :json
    end

    assert_response 204
  end
end
