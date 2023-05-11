class User < ApplicationRecord
    include Rails.application.routes.url_helpers

    has_many :studies, -> {order(created_at: :DESC)}
    has_many :locations, through: :studies

    has_one_attached :avatar
    has_secure_password

    has_many :comments

    has_many :notifications, -> {order(created_at: :DESC)}

    validates :username, presence: true, uniqueness: true
    validates :circular_avatar_status,inclusion: [true, false]

    def avatar_url
        rails_blob_path(self.avatar)
    end

    # def filtered_user_studies(tag_id)
    #     Tag.find_by!(id: tag_id).studies.where(user_id: self.id)
    # end
end
