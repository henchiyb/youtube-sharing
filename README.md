# Introduction

Youtube sharing application: Sharing your favorite youtube video with others.
Features:
  - User registration and login
  - Sharing YouTube videos by input Youtube URL
  - Viewing a list of shared videos
  - Real-time notifications for new video shares - Click to notification to go to the video page

*Production*:
  - API URL: https://youtube-sharing.fly.dev
  - Client URL: https://youtube-sharing.pages.dev

*Local*:
  - Local API URL: https://api-local.youtubesharing.com:3001/
  - Local frontend URL: https://local.youtubesharing.com:3000/

# Prerequisites
- Ruby v3.2.2
- Node v20.6.1
- Postgresql 14


# Installation & Configuration
- Pull the repository from this: https://github.com/henchiyb/youtube-sharing
- On local:
1. Add to `/etc/hosts` file:

```
127.0.0.1 local.youtubesharing.com
::1       local.youtubesharing.com

127.0.0.1 api-local.youtubesharing.com
::1       api-local.youtubesharing.com
```
2. Setup the local certificate

```
  // Setup self-sign local cert 
  cd local-cert
  ./setup.sh
  cd ../
```
3. Create env file:
- Look up your ip: `ifconfig -u | grep 'inet ' | grep -v 127.0.0.1 | cut -d\  -f2 | head -1`
- Create .env file copy from .env.example file and replace DB_HOST with your IP


4. Run the dev.sh script: 
- With local rails server: `./dev.sh`
- With docker rails server: `./dev.sh docker`

# Running Application (without using script)
### Repository Structure
- root fodler # rails app
  - app
  - spec # RSpec test
  - frontend/youtube-sharing # React app

### Model
- User
  - email
  - password
- Video
  - title
  - description
  - video_url
  - user_id

### Installation
- Add to `/etc/hosts` file:

```
127.0.0.1 local.youtubesharing.com
::1       local.youtubesharing.com

127.0.0.1 api-local.youtubesharing.com
::1       api-local.youtubesharing.com
```
- Rails
  - Start db and redis: `docker compose up -d db redis`
  - DB migration

  ```
  bundle install
  bin/rails db:create
  bin/rails db:migrate
  bin/rails db:seed
  ```

  - Setup local cert (Same as `local-cert/setup.sh`` file)
  - Run server: `bundle exec rails s -p 3001 -b "ssl://api-local.youtubesharing.com:3001?key=local-cert/api-local.youtubesharing.com.key&cert=local-cert/api-local.youtubesharing.com.crt"`
- React
  ```
  cd frontend/youtube-sharing
  npm i
  npm run start
  ```
### Test run
- Rails

```
bundle exec rspec

```
- React

```
cd frontend/youtube-sharing
npm run test
```

# Docker build
### Local
`docker compose build rails`

### Production
`docker build -f Dockerfile .`

# How to use this app
- Register a new account
- Login, click the share button to share a new Youtube video
- When share video, the video title will be fetched from youtube, so you only need to fill the description and Youtube URL
- The Notifications will be shown for all users (include not logged in users) except the video share owner (To test the notification, open a new igconito tab or access the web on other devices/browsers)
- You can click to the notification to the specific video page
- Pages are responsive

### Some limits
- No pagination - that mean if we have a lot of shared videos the Home page will load all of them and make the performance down
- No history for notifications

# Deploy
- Rails
  - Rails app is deployed by [fly.io](https://fly.io/). The postgre DB and Redis server also is served by fly.io
  ```
  # Install fly cli
  brew install flyctl
  # Login
  fly auth login
  # Init project
  fly launch
  # Deploy without replica
  fly deploy --ha=false
  # Add some needed secrets
  fly secrets set REDIS_URL=xxx
  fly secrets set CLIENT_URL=xxx
  ...
  ```
- React
  - Deployed via Cloudflare Pages
  - For more information please refer to [Cloudflare Pages doc](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
# Troubleshooting
- If have problem when running on local
  - Port already in used: kill the port
  `lsof -i :3000 | awk '/[1-9]/ {print $2}' | xargs kill -9`

  - Cannot run bundle install: check presequites install
  - Cannot connect Postgresql database: check .env file setup, need to same as below

  ```
    CLIENT_URL=https://local.youtubesharing.com:3000
    REDIS_URL=redis://localhost:6379/1
    DB_USERNAME=postgres
    DB_PASSWORD=
    # Set your ip address as host
    DB_HOST=192.168.0.156
    DB_NAME=youtube_sharing_dev
    DB_URL=
  ```

  - SSL (HTTPS) error: check self sign cert setup
    - Check add host to `/etc/hosts` as presequites
    - You can re-generate and re-setup the cert by running

    ```
    cd local-cert
    ./generate.sh
    ./setup.sh
    ```
  - SECRET_KE_BASE missing error: run `bin/rails credentials:edit` or `bin/rails credentials:edit --environment=production` for generate key base. Add the master.key file value as the RAILS_MASTER_KEY env
