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
        study = @user.studies.create!(study_params)

        if study&.valid?
            render json: study
        # else
        #     render json: {error: "Unauthorized User"}, status: :unauthorized
        end
    end

    def update
        const study = @user.studies.find_by(id: study_params[:id])
        study&.update!()
    end

    def destroy
        study = @user.studies.find_by(id: study_params[:id])

        study&.destroy!

        render json: [], status: :no_content
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
