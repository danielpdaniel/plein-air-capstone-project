class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create

        user = User.find_by(username: user_params[:username])
        if user&.authenticate(user_params[:password])
            session[:user_id] = user.id
            render json: user, status: :accepted
        else
            render json: {errors: ["Invalid Username or Password"]}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
    end

    private

    def user_params
        params.permit(:username, :password)
    end
end
