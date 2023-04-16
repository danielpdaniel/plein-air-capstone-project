class Tag < ApplicationRecord
    has_many :studies_tags
    has_many :studies, through: :studies_tags

    validates :name, uniqueness: true
end
