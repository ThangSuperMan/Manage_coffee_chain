class Product < ApplicationRecord
  belongs_to :subcategory

  has_many :product_related_images
  has_many :product_tags
  has_many :tags, through: :product_tags
  has_many :product_sizes
  has_many :sizes, through: :product_sizes
  has_many :product_categories
  has_many :categories, through: :product_categories

  validates :start_at, presence: true
  validates :end_at, presence: true
  validate :end_at_greater_than_start_at
  validates :meta_title, presence: true
  validates :slug, presence: true
  validates :image_url, presence: true

  def end_at_greater_than_start_at
    if end_at.present? && start_at.present? && end_at < start_at
      errors.add(:end_at, 'Must be greater than the start at')
    end
  end
end
