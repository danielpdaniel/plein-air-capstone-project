class Tag < ApplicationRecord
    has_many :studies_tags, -> {order(created_at: :DESC)}
    has_many :studies, through: :studies_tags
    has_many :locations, through: :studies

    validates :name, uniqueness: true
end
