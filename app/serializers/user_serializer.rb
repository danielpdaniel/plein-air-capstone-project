class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :about, :avatar_info

  has_many :studies
  
  def avatar_info
    # byebug
    object.avatar_url
  end
end
