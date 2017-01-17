class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.string :name
      t.json :photos
      t.timestamps null: false
    end
  end
end
