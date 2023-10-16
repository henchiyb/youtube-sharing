# Introduction

Youtube sharing application: Sharing your favorite youtube video with others.
Features:
  - User registration and login
  - Sharing YouTube videos by input Youtube URL
  - Viewing a list of shared videos
  - Real-time notifications for new video shares - Click to notification to go to the video page

Production:
  - API URL: https://youtube-sharing.fly.dev
  - Client URL: https://youtube-sharing.pages.dev
Local:
Local API URL: https://api-local.youtubesharing.com:3001/
Local frontend URL: https://local.youtubesharing.com:3000/

# Prerequisites
- Ruby v3.2.2
- Node v20.6.1
- Postgresql 14



# Installation & Configuration
- On local:
1. Setup the local certificate

```
  // Setup self-sign local cert 
  cd local-cert
  ./setup.sh
  cd ../
```
2. Create env file:

```
cp .env.example .env
cp frontend/youtube-sharing/.env.example frontend/youtube-sharing/.env
```

3. Run the dev.sh script: `./dev.sh`

### Model

- User
  - email
  - password
- Video
  - title
  - description
  - video_url
  - user_id
- Notification
  - video_id
  - user_id

