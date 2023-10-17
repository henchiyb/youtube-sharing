module Api
  class VideosController < ApplicationController
    skip_before_action :authenticate_user!, only: [:index, :show]

    def index
      render json: { message: 'Videos', videos: Video.all.includes(:user).order(created_at: :desc).map {|vid| vid.api_response} }
    end

    def create
      query = { url: video_params[:url], format: 'json' }.to_query
      video_data = Faraday.get("https://www.youtube.com/oembed?#{query}").body
      title = JSON.parse(video_data)['title'] || "Unknown title"
      video = current_user.videos.create!(video_params.merge(title: title))
      ActionCable.server.broadcast('notification_channel', video.api_response)

      render json: { message: 'Video created', video: video.api_response }, status: :created
    end

    def show
      video = Video.find_by(id: params[:id])
      if video
        render json: { message: 'Video', video: video.api_response }
      else
        render json: { message: 'Video not found' }, status: :not_found
      end
    end

    private

    def video_params
      params.required(:video).permit(:description, :url)
    end
  end
end
