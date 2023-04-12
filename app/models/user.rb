class User < ApplicationRecord
    include Rails.application.routes.url_helpers

    has_one_attached :avatar
    has_secure_password

    validates :username, presence: true, uniqueness: true

    def avatar_url
        rails_blob_path(self.avatar)
    end
end
