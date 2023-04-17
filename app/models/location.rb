class Location < ApplicationRecord
    has_many :studies
    has_many :users, through: :studies

    # validates :name, presence: true
    validates :longitude, presence: true
    validates :latitude, presence: true
end
