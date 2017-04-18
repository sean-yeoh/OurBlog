class Photo < ApplicationRecord
  paginates_per 16
  mount_uploader :filename, PhotoUploader
  belongs_to :album
  default_scope  { order(:created_at => :desc) }
end
