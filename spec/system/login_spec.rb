require 'rails_helper'

RSpec.describe "Login", type: :system do
  context "when signs up for a new account" do
    it "show page" do
      visit("/")
      expect(page).to have_text("Funny Videos")
      expect(page).to have_text("Signup")
      expect(page).to have_text("Login")
      expect(page).to have_text("Funny Video 1")
      expect(page).to have_text("Funny Video 2")
    end

    it "Visitor signs up and login to the new account" do
      visit("/")
      click_on("Signup")
      fill_in("Email", with: "test_account@test.com")
      fill_in("Password", with: "password")
      click_on("Signup")
      expect(page).to have_text("Signup success!")

      fill_in("Email", with: "test_account@test.com")
      fill_in("Password", with: "password")
      click_on("Login")
      expect(page).to have_text("test_account@test.com")
    end
  end
end
