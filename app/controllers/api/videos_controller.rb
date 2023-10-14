module Api
  class VideosController < ApplicationController
    def index
      render json: { message: 'Videos', videos: Video.all.order(created_at: :desc).map {|vid| vid.api_response} }
    end

    def create
      video = current_user.videos.create!(video_params)

      render json: { message: 'Video created', video: }, status: :created
    end

    private

    def video_params
      params.required(:video).permit(:title, :description, :url)
    end
  end
end
