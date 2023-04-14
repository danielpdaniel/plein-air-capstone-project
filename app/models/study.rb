class Study < ApplicationRecord
    belongs_to :user
    belongs_to :location

    has_many_attached :images

    validates :user_id, presence: true
    validates :images, presence: true
end
