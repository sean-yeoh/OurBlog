class CreateUploads < ActiveRecord::Migration[5.0]
  def change
    create_table :uploads do |t|
      t.json :filename
      t.references :album, foreign_key: true
      t.timestamps null: false
    end
  end
end
