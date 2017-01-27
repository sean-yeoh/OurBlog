class Post < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validates :content, presence: true
  belongs_to :user
  default_scope  { order(:created_at => :desc) }
end
