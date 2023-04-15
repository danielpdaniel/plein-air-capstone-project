class StudiesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_study_response

    def index
        studies = Study.all
        render json: studies, status: :ok
    end

    def show
        study = Study.find_by(id: study_params[:id])
        render json: study, status: :ok
    end

    def create
        byebug
        # study = @user.studies.create!(location_id: 1, images: params[:images])
        study = @user.studies.create!(study_params)

    

        if study&.valid?
            render json: study
        # else
        #     render json: {error: "Unauthorized User"}, status: :unauthorized
        end
    end

    private

    def study_params
        params.permit(:id, :user_id, :location_id, :caption, images: [])
        # params.permit(:user_id, :location_id, :images)
    end

    def invalid_study_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
