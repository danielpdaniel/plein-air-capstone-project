class AddCircularAvatarStatusToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :circular_avatar_status, :boolean
  end
end
