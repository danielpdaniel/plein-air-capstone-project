class Location < ApplicationRecord
    belongs_to :study
    has_many :users, through: :studies

    validates :longitude, presence: true
    validates :latitude, presence: true
    validates :lat_lng, presence: true
end
