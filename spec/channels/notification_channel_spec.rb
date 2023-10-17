require 'rails_helper'

RSpec.describe NotificationChannel, type: :channel do
  let(:user) { User.first}
  let(:video) { Video.create!(title: 'Title', description: 'Description', url: 'https://www.youtube.com/watch?v=hBXzaJHR_ZA', user_id: user.id) }

  it "broadcasts to notification_channel" do
    expect {ActionCable.server.broadcast('notification_channel', { video: video.api_response })}
      .to have_broadcasted_to('notification_channel').with(video: video.api_response)
  end
end
