class Album < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  belongs_to :user
  has_many :photos, dependent: :destroy
  default_scope  { order(:created_at => :desc) }
end
