require 'rails_helper'

RSpec.describe Video, type: :model do
  describe 'validations' do
    context 'when title is not present' do
      it 'is invalid' do
        expect { described_class.create(title: nil, description: 'description', url: 'url', user_id: 1) }.to change(described_class, :count).by(0)
      end
    end

    context 'when description is not present' do
      it 'is invalid' do
        expect { described_class.create(title: 'title', description: nil, url: 'url', user_id: 1) }.to change(described_class, :count).by(0)
      end
    end

    context 'when url is not present' do
      it 'is invalid' do
        expect { described_class.create(title: 'title', description: 'description', url: nil, user_id: 1) }.to change(described_class, :count).by(0)
      end
    end
  end
end
