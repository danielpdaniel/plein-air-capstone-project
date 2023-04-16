class CreateStudiesTags < ActiveRecord::Migration[7.0]
  def change
    create_table :studies_tags do |t|
      t.integer :study_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
