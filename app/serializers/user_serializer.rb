class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :about, :avatar_info

  has_many :studies
  has_many :notifications
  
  def avatar_info
    object.avatar_url
  end
end
