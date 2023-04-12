class UsersController < ApplicationController
include ActiveStorage::Blob::Analyzable

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
end
