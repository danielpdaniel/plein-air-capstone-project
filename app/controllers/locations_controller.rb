class LocationsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_location_response

skip_before_action :authorize, only: [:index, :tag_filter]

    def index
        # byebug
        locations = Location.all
        render json: locations, status: :ok, include: ['tags', 'study.tags', 'comments', 'study.comments']
    end

    # def create
    #     location = Location.create!(location_params)
    #     render json: location, status: :created
    # end

    def tag_filter
        # byebug
        tag = Tag.find_by!(tag_name: params[:tag_name])
        filtered_locations = tag.locations
        render json: filtered_locations, status: :ok, include: ['tags', 'study.tags']
    end


    private

    def location_params
        params.permit(:description, :name)
    end

    def invalid_location_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def not_found_study_response
            render json: {error: "Study not found"}, status: :not_found
        end
end
