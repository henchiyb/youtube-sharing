class Video < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :url, presence: true
  belongs_to :user

  before_validation do
    if url.present?
      uri    = URI.parse(url)
      params = CGI.parse(uri.query)
      query = { url: url, format: 'json' }.to_query
      video_data = Faraday.get("https://www.youtube.com/oembed?#{query}").body
      self.title = JSON.parse(video_data)['title'] || "Unknown title"
      self.url = "https://www.youtube.com/embed/#{params['v'].first}"
    end
  rescue StandardError
    errors.add(:url, 'is not a valid youtube url')
  end

  def api_response
    {
      id:,
      title:,
      description:,
      url:,
      shareBy: user.email
    }
  end
end
