class CreatePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :photos do |t|
      t.string :filename
      t.references :album, foreign_key: true
      t.timestamps null: false
    end
  end
end
