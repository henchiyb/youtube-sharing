module Api
  class UsersController < ApplicationController
    skip_before_action :authenticate_user!, only: [:create]

    def create
      return render json: { error: 'User already existed' }, status: :unprocessable_entity if User.find_by(email: user_params[:email])

      user = User.create!(user_params)
      render json: { message: 'User created', user: { id: user.id, email: user.email } }
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    private

    def user_params
      params.required(:user).permit(:email, :password)
    end
  end
end
