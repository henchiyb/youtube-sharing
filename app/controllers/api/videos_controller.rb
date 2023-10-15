module Api
  class VideosController < ApplicationController
    skip_before_action :authenticate_user!, only: [:index]

    def index
      render json: { message: 'Videos', videos: Video.all.includes(:user).order(created_at: :desc).map {|vid| vid.api_response} }
    end

    def create
      video = current_user.videos.create!(video_params)
      ActionCable.server.broadcast('notification_channel', video.api_response)

      render json: { message: 'Video created', video: }, status: :created
    end

    private

    def video_params
      params.required(:video).permit(:title, :description, :url)
    end
  end
end
