class StudiesController < ApplicationController

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
end
