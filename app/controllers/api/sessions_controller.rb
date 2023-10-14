module Api
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user!, only: [:create]

    def create
      user = User.find_by(email: user_params[:email])
      return render json: { error: 'Account with this email is not existed' }, status: :not_found if user.nil?
      return render json: { error: 'Invalid email or password' }, status: :unprocessable_entity unless user.password_valid?(user_params[:password])

      session[:user_id] = user.id
      render json: { message: 'Logged in', user: { id: user.id, email: user.email } }
    end

    def me
      render json: { message: 'Authenticated', user: { id: current_user.id, email: current_user.email } }
    end

    def destroy
      reset_session
      render json: { data: 'Logout' }, status: :ok
    end

    private

    def user_params
      params.required(:user).permit(:email, :password)
    end
  end
end
