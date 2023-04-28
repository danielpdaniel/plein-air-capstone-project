class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :study_id, :read_status
  byebug
end
