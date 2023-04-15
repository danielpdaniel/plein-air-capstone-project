class StudySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :location_id, :created_at, :attached_images, :images, :caption

  def attached_images

    object.study_images_urls
  end
end
