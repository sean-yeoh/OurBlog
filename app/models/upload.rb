class Upload < ApplicationRecord
  belongs_to :album
  mount_uploaders :filename, PhotoUploader
end
