class TagsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_tag_response

    def index
        tags = Tag.all
        render json: tags, status: :ok
    end

    def show
        # byebug
        tags = Tag.find_by!(id: tag_params[:id])
        render json: tags, status: :ok
    end

    private

    def tag_params
        params.permit(:id)
    end

    def invalid_tag_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
