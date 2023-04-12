class UsersController < ApplicationController
    include ActiveStorage::Blob::Analyzable
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_user_response
    rescue_from ActiveRecord::RecordNotFound, with: :not_found_user_response

    def index
        users = User.all
        render json: users, status: :ok
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update
        user = User.first
    
        # user.avatar.attach(params[:avatar])

        # user.update(user_params)
        render json: user, status: :accepted
    end

    private

    def user_params
        params.permit(:username, :password, :about, :avatar, :id, :user, :patty)
    end

    def invalid_user_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def not_found_user_response
        render json: {Error: "User Not Found"}, status: :not_found
    end
end
