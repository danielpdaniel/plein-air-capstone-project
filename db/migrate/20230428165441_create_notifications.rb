class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.integer :study_id
      t.boolean :read_status

      t.timestamps
    end
  end
end
