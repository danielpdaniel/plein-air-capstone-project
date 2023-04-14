class StudiesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_study_response

    def index
        studies = Study.all
        render json: studies, status: :ok
    end
    def create
        study = @user.studies.create!(study_params)

        if study&.valid?
            render json: study
        # else
        #     render json: {error: "Unauthorized User"}, status: :unauthorized
        end
    end

    private

    def study_params
        params.permit(:user_id, :location_id, images: [])
    end

    def invalid_study_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
