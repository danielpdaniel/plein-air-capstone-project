class CreateStudies < ActiveRecord::Migration[7.0]
  def change
    create_table :studies do |t|
      t.integer :user_id
      t.integer :location_id
      
      t.timestamps
    end
  end
end
