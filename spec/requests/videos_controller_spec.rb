require 'rails_helper'

RSpec.describe 'Videos', type: :request do
  let!(:user) { User.create(email: 'test@test.com', password: 'password') }
  let!(:video) { Video.create(title: 'Title', description: 'Description', user: user, url: 'https://www.youtube.com/watch?v=hBXzaJHR_ZA') }

  describe 'GET /api/videos/index' do
    it 'returns http success' do
      get '/api/videos'

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to eq({
        'message': 'Videos',
        'videos': [{
          'id': video.id,
          title: 'Title',
          description:
          'Description',
          shareBy: user.email,
          url: 'https://www.youtube.com/embed/hBXzaJHR_ZA'
        }]
      }.as_json)
    end
  end

  describe 'GET /api/videos/:id' do
    it 'returns http success' do
      get "/api/videos/#{video.id}"

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to eq({
        'message': 'Video',
        'video': {
          'id': video.id,
          title: 'Title',
          description:
          'Description',
          shareBy: user.email,
          url: 'https://www.youtube.com/embed/hBXzaJHR_ZA'
        }
      }.as_json)
    end
  end

  describe 'POST /api/videos/create' do
    context 'when user is not logged in' do
      it 'returns unauthorized' do
        post '/api/videos/create', params: { video: { title: 'Title', description: 'Description', url: 'https://www.youtube.com/watch?v=hBXzaJHR_ZA' } }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is logged in' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
      end

      it 'returns http success' do
        post '/api/videos/create', params: { video: { title: 'Title', description: 'Description', url: 'https://www.youtube.com/watch?v=hBXzaJHR_ZA' } }

        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)['message']).to eq('Video created')
      end
    end
  end
end
