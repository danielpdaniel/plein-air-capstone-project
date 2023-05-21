class Study < ApplicationRecord
    include Rails.application.routes.url_helpers

    belongs_to :user
    has_one :location, dependent: :destroy
    
    has_many :studies_tags
    has_many :tags, through: :studies_tags

    has_many :comments, -> {order(created_at: :ASC)}

    has_many :notifications

    has_many_attached :images

    validates :user_id, presence: true
    validates :images, presence: true, length: {maximum: 10}
    validates :caption, length: {maximum: 560}

    def study_images_urls
        images = []
        self.images.each do |image|
            img_obj = {
                id: image.id,
                img_url: rails_blob_path(image)
            } 
            images.push(img_obj)
        end

        return images
        # rails_blob_path(self.images)
    end
end
