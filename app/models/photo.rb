class Photo < ApplicationRecord
  mount_uploader :filename, PhotoUploader
  belongs_to :album
  default_scope  { order(:created_at => :desc) }
end
