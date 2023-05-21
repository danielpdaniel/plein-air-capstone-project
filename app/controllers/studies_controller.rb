class StudiesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_study_response
    rescue_from ActiveRecord::RecordNotFound, with: :not_found_study_response

    skip_before_action :authorize, only: [:user_tag_filter, :tag_filter]
    
    def index
        studies = Study.all
        render json: studies, status: :ok
    end

    def show
        study = Study.find_by(id: study_params[:id])
        render json: study, status: :ok
    end

    def create
        # byebug
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

            if params[:latLng]
                latitude = params[:lat].to_f
                longitude = params[:lng].to_f
               location = Location.create!(lat_lng: params[:latLng], study_id: study.id, latitude: latitude, longitude: longitude)
            end

            render json: study, status: :accepted
        end
    end

    def update
        study = @user.studies.find_by(id: study_params[:id])
# byebug
        if(params[:images_to_purge])
            if (study.images.count <= params[:images_to_purge].count)
                return render json: {errors: ["Images cannot be blank"]}, status: :unprocessable_entity
            else
                params[:images_to_purge]&.each do |image_id|
                    study.images.find_by!(id: image_id).purge
                 end
            end
        end 
    # end

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

    def tag_filter
        # byebug
        studies =  Tag.find_by!(name: params[:tag_name]).studies
        render json: studies, status: :ok
    end

    def user_tag_filter
        # byebug
        # user = User.find_by!(id: study_params[:id])
        studies = Tag.find_by!(name: params[:tag_name]).studies.where(user_id: study_params[:id])
        render json: studies, status: :ok
    end

    private

    def study_params
        params.permit(:id, :user_id, :caption, images: [])
        # params.permit(:user_id, :location_id, :images)
    end

    def invalid_study_response(invalid)
        
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def not_found_study_response
        render json: {error: "Study not found"}, status: :not_found
    end
end
