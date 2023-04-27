class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :comment_text, :author_username

  def author_username
    object.user.username
  end
end
