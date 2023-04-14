class Study < ApplicationRecord
    belongs_to :user
    belongs_to :location

    has_many_attached :images
end
