class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :study_id, :comment_text, :author_username, :study_author_id

  def author_username
    object.user.username
  end

  def study_author_id
    object.study.user_id
  end
end
