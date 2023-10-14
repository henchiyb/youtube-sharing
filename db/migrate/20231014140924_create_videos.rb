class CreateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.string :description, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
