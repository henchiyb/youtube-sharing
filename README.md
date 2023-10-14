# README

Youtube sharing application

Local API URL: https://api-local.youtubesharing.com:3001/
Local frontend URL: https://local.youtubesharing.com:3000/


# Setup
- On local:
1. Setup the local cert

```
  // Setup self-sign local cert 
  cd local-cert
  ./setup.sh
  cd ../
```
2. Create env file:

```
cp .env.example .env
cd frontend/youtube-sharing && cp .env.example .env
cd ../../
```

3. Run the dev.sh script: ./dev.sh

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

