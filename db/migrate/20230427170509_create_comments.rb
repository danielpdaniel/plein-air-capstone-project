class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :study_id
      t.string :comment_text

      t.timestamps
    end
  end
end
