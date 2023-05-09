class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :about, :avatar_info, :unread_notifs

  has_many :studies
  # has_many :notifications
  
  def avatar_info
    object.avatar_url
  end

  def unread_notifs
    # byebug
    unread_notifs = object.notifications.where(read_status: false)
    unread_notifs.count > 0 ? true : false
  end
end
