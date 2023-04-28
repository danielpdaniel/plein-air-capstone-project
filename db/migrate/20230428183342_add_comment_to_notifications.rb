class AddCommentToNotifications < ActiveRecord::Migration[7.0]
  def change
    add_column :notifications, :comment_id, :integer
  end
end
