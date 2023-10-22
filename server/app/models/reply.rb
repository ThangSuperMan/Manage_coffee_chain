  class Reply < ApplicationRecord
    belongs_to :comment
    belongs_to :user

    validates :body, presence: true
  end
