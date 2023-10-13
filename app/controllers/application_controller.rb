# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery
  before_action :authenticate_user!

  def authenticate_user!
    render json: { jerror: 'Unauthorized' }, status: :unauthorized unless current_user
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
end
