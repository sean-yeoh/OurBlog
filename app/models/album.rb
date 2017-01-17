class Album < ApplicationRecord
  mount_uploaders :photos, PhotoUploader
  validates :name, presence: true, uniqueness: true
  validates :photos, presence: true
end
