class UpdateTagNameColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :tags, :name, :tag_name
  end
end
