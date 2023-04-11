class User < ApplicationRecord
    include Rails.application.routes.url_helpers

    has_one_attached :avatar
    has_secure_password
end
