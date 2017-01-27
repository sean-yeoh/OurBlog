class Ckeditor::Picture < Ckeditor::Asset
  mount_uploader :data, CkeditorPictureUploader, mount_on: :data_file_name
  default_scope  { order(:created_at => :desc) }
  def url_content
    url(:content)
  end
end
