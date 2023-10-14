class Video < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :url, presence: true
  belongs_to :user

  before_validation do
    youtube_id = url.split('=').last
    self.url = "https://www.youtube.com/embed/#{youtube_id}"
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
