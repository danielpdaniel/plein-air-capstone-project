class User < ApplicationRecord
    include Rails.application.routes.url_helpers

    has_one_attached :avatar
    has_secure_password

    def avatar_url
        rails_blob_path(self.avatar)
    end
end
