class AddCaptionToStudies < ActiveRecord::Migration[7.0]
  def change
    add_column :studies, :caption, :string
  end
end
