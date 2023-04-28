class CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_comment_response


    def create
        byebug
        comment = @user.comments.create!(comment_params)

        study_for_notif = Study.find_by!(id: params[:study_id])
        notification = study_for_notif.user.notifications.create!(author_id: params[:user_id], study_id: study_for_notif.id, read_status: false)

        render json: comment, status: :ok
    end

    def destroy
        comment = @user.comments.find_by!(id: comment_params[:id])
        comment&.destroy!
        render json: [], status: :no_content
    end

    private

    def comment_params
        params.permit(:id, :study_id, :comment_text)
    end

    def invalid_comment_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
