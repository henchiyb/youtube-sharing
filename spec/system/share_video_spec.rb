require 'rails_helper'

RSpec.describe "Login", type: :system do
  context "when share youtube URL" do
    it "Visitor signs up and login to the new account" do
      visit("/")
      fill_in("Email", with: "test1@test.com")
      fill_in("Password", with: "123456")
      click_on("Login")
      expect(page).to have_text("test1@test.com")

      click_on("Share")
      fill_in("Description", with: "Test description")
      fill_in("Url", with: "https://www.youtube.com/watch?v=123456")
      click_on("Share")
      expect(page).to have_text("Share video failed!")

      fill_in("Description", with: "Test description")
      fill_in("Url", with: "https://www.youtube.com/watch?v=hBXzaJHR_ZA")
      click_on("Share")
      expect(page).to have_text("Share video success!")
    end
  end
end
