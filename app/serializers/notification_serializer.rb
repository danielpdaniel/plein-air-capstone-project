class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :study_id, :read_status, :study, :comment_id, :comment

  def comment
    comment = Comment.find_by(id: object.comment_id)
  end
  
end
