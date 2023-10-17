require 'rails_helper'

RSpec.describe 'Sessions', type: :request do
  describe 'POST /api/auth/login' do
    let(:params) {{ user: { email: 'test@test.com', password: 'password' } }}
    let!(:user) { User.create(email: 'test@test.com', password: 'password') }

    it 'returns http success' do
      post '/api/auth/login', params: params
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to eq({
        'message': 'Logged in',
        'user': { 'id': user.id, 'email': user.email }
      }.as_json)
    end
  end

  describe 'POST /api/auth/me' do
    let!(:user) { User.create(email: 'test@test.com', password: 'password') }

    context 'when user is not logged in' do
      it 'returns failed response' do
        post '/api/auth/me'
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is logged in' do
      before do
        allow_any_instance_of(Api::SessionsController).to receive(:current_user).and_return(user)
      end

      it 'returns http success' do
        post '/api/auth/me'

        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)).to eq({
          'message': 'Authenticated',
          'user': { 'id': user.id, 'email': user.email }
        }.as_json)
      end
    end
  end

  describe 'DELETE /api/auth/logout' do
    context 'when user is not logged in' do
      it 'returns failed response' do
        delete '/api/auth/logout'
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is logged in' do
      let!(:user) { User.create(email: 'test@test.com', password: 'password') }

      before do
        allow_any_instance_of(Api::SessionsController).to receive(:current_user).and_return(user)
      end

      it 'returns http success' do
        delete '/api/auth/logout'
        expect(response).to have_http_status(:success)
      end
    end
  end
end
