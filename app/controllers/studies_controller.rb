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
            params[:tags]&.each do |tag|
                tag_record = Tag.find_by(name: tag)
                if tag_record
                    study.studies_tags.create!(study_id: study.id, tag_id: tag_record.id)
                else
                    study.tags.create!(name: tag)
                end
            end

            render json: study, status: :accepted
        # else
        #     render json: {error: "Unauthorized User"}, status: :unauthorized
        end
    end

    def update
    #  byebug
        study = @user.studies.find_by(id: study_params[:id])
    
        params[:images_to_delete]&.each do |image_id|
         study.images.find_by(id: image_id).purge
        end

        params[:tags_to_delete]&.each do |tag_id|
            study_tag = study.studies_tags.find_by(tag_id: tag_id)
            study_tag&.destroy!
        end

        params[:tags]&.each do |tag|
            tag_record = Tag.find_by(name: tag)
            if tag_record
                study.studies_tags.create!(study_id: study.id, tag_id: tag_record.id)
            else
                study.tags.create!(name: tag)
            end
        end
        
        study&.update!(study_params)
        render json: study, status: :accepted
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
