class Notification < ApplicationRecord
    belongs_to :user
    belongs_to :study
    has_one :user, as: :author

    validates :user_id, presence: true
    # validates :author, presence: true
    validates :read_status, inclusion: [true, false]
end
