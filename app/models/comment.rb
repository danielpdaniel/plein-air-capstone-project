class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :study
    has_one :notification

    validates :user_id, presence: true
    validates :study_id, presence: true
    validates :comment_text, presence: true
end
