require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'POST /api/auth/signup' do
    let(:params) {{ user: { email: 'test@test.com', password: 'password' } }}

    context 'when user is already existed' do
      before do
        User.create(email: 'test@test.com', password: 'password')
      end

      it 'returns http failed' do
        post '/api/auth/signup', params: params

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['error']).to eq('User already existed')
      end
    end

    context 'when password is not valid' do
      let(:params) {{ user: { email: 'test@test.com', password: 'pass' } }}

      it 'returns http failed' do
        post '/api/auth/signup', params: params

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['error']).to eq('Validation failed: Password is too short (minimum is 6 characters)')
      end
    end

    context 'when user is valid' do
      it 'returns http success' do
        post '/api/auth/signup', params: params

        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)['message']).to eq('User created')
      end
    end
  end
end
