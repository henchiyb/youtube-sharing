module Api
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user!

    def create
      user = User.find_by(email: user_params[:email])
      return render json: { error: 'Account with this email is not existed' }, status: :not_found if user.nil?
      return render json: { error: 'Invalid email or password' }, status: :unprocessable_entity unless user.password_valid?(user_params[:password])

      session[:user_id] = user.id
      render json: { message: 'Logged in' }
    end

    private

    def user_params
      params.required(:user).permit(:email, :password)
    end
  end
end
