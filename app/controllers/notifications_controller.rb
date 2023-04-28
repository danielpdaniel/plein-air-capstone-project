class NotificationsController < ApplicationController

    def mark_all_as_read
        # byebug
        notifications = @user.notifications
        # notifications&.each do |notif|
        #     notif.update!(read_status: true)
        # end
        notifications&.update_all(read_status: true)
        render json: notifications, status: :ok
    end
end
