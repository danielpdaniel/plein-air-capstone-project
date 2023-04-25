class StudySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :location_id, :created_at, :attached_images, :caption, :author_username

  has_many :tags
  has_one :location

  def attached_images
    object.study_images_urls
  end

  def author_username
    object.user.username
  end

  # def author_id
  #   object.user.id
  # end
end
