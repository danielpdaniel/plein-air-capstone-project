class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :about, :avatar, :avatar_info

  def avatar_info
    # byebug
    object.avatar_url
  end
end
