class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }

  def password
    @password ||= BCrypt::Password.new(encrypted_password)
  end

  def password=(new_password)
    @password = new_password
    self.encrypted_password = BCrypt::Password.create(new_password)
  end

  def password_valid?(input_password)
    password == input_password
  end
end
