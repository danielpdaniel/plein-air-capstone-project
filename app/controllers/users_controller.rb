class UsersController < ApplicationController
    include ActiveStorage::Blob::Analyzable
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_user_response
    rescue_from ActiveRecord::RecordNotFound, with: :not_found_user_response
    skip_before_action :authorize, only: [:index, :show, :create]
    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
    #   byebug 
        user = User.find_by!(id: user_params[:id])

        render json: user, status: :ok, include: ['tags', 'studies.tags', 'comments', 'studies.comments']
    end

    def create
        user = User.create!(user_params)
        default_avatar = ActiveStorage::Blob.first
        user&.avatar.attach(default_avatar)
        if user&.valid?
            user.update!(circular_avatar_status: false)
            session[:user_id] = user.id
            render json: user, status: :created
        end
    end

    def update
        # byebug
        # user = User.find_by!(id: user_params[:id])
        @user&.update!(username: params[:username], about: params[:about], circular_avatar_status: params[:circular_avatar_status])

        if params[:avatar]
           
        @user&.avatar.attach(params[:avatar])
        end

        # user.update(user_params)
        render json: @user, status: :accepted
    end

    def session_user
        if @user
            render json: @user, status: :ok, include: ['tags', 'studies.tags', 'comments', 'studies.comments']
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private

    def user_params
        params.permit(:username, :password, :about, :avatar, :id, :user, :tag_id, :circular_avatar_status)
    end

    def invalid_user_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def not_found_user_response
        render json: {Error: "User Not Found"}, status: :not_found
    end
end
