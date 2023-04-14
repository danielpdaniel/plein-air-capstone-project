class Study < ApplicationRecord
    include Rails.application.routes.url_helpers

    belongs_to :user
    belongs_to :location

    has_many_attached :images

    validates :user_id, presence: true
    validates :images, presence: true

    def study_images_urls
        images = []
        self.images.each do |image| 
            images.push(rails_blob_path(image))
        end

        return images
        # rails_blob_path(self.images)
    end
end
