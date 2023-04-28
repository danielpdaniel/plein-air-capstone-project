class Notification < ApplicationRecord
    belongs_to :user
    belongs_to :study
    # has_one :user, as: :author_id
    has_one :comment
    # has_one :user, through: comment

    validates :user_id, presence: true
    # validates :author_id, presence: true
    validates :read_status, inclusion: [true, false]
end
