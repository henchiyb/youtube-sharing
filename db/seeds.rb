# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

if User.find_by(email: 'test1@test.com').nil?
  5.times do |n|
    User.create!(
      email: "test#{n + 1}@test.com",
      password: '123456'
    )
  end
end

if Video.find_by(title: 'Funny Video 1').nil?
  5.times do |n|
    Video.create!(
      user: User.first,
      title: "Funny Video #{n + 1}",
      url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      description: 'This is a funny video'
    )
  end
end
