class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :study_id, :read_status, :study, :author
  
end
