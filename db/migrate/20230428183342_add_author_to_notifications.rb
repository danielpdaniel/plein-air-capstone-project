class AddAuthorToNotifications < ActiveRecord::Migration[7.0]
  def change
    add_column :notifications, :author_id, :integer
  end
end
