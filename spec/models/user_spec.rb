require 'rails_helper'

RSpec.describe(User, type: :model) do
  describe 'validations' do
    context 'when email is not present' do
      it 'is invalid' do
        expect { described_class.create(email: nil, password: 'password') }.to change(described_class, :count).by(0)
      end
    end

    context 'when password is not present' do
      it 'is invalid' do
        expect { described_class.create(email: 'test@example.com', password: '') }.to change(described_class, :count).by(0)
      end
    end

    context 'when password is less than 6 characters' do
      it 'is invalid' do
        expect { described_class.create(email: 'test@example.com', password: '12345') }.to change(described_class, :count).by(0)
      end
    end

    context 'when email is not unique' do
      before do
        described_class.create(email: 'test@example.com', password: 'password')
      end

      it 'is invalid' do
        expect { described_class.create(email: 'test@example.com', password: 'password') }.to change(described_class, :count).by(0)
      end
    end

    context 'when email is unique' do
      it 'is valid' do
        expect { described_class.create(email: 'test@example.com', password: 'password') }.to change(described_class, :count).by(1)
      end

      it 'password is encrypted' do
        expect(described_class.create(email: 'test@example.com', password: 'password').encrypted_password).not_to eq('password')
      end
    end
  end
end
