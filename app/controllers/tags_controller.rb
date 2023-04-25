class TagsController < ApplicationController

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
end
