class LocationsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_location_response
    
    def create
        location = Location.create!(location_params)
        render json: location, status: :created
    end

    private

    def location_params
        params.permit(:description, :name)
    end

    def invalid_location_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
