class SessionsController < ApplicationController

    def create

        user = User.find_by(username: user_params[:username])
        if user&.authenticate(user_params[:password])
            session[:user_id] = user.id
            render json: user, status: :accepted
        else
            render json: {errors: ["Invalid Username or Password"]}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password)
    end
end
