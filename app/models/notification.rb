class Notification < ApplicationRecord
    belongs_to :user
    belongs_to :study

    validates :user_id, presence: true
    validates :read_status, inclusion: [true, false]
end
