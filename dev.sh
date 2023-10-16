#!/bin/bash
set -e
if [ "$1" == "docker" ]; then
  export BUILD_DOCKER=1
fi

start_docker () {
  docker compose up -d db redis
}

start_rails() {
  if [ "$BUILD_DOCKER" == 1 ]; then
    echo "!!! Starting Rails Docker !!!"
    docker compose run rails bundle exec rails db:create
    docker compose run rails bundle exec rails db:migrate
    docker compose run rails bundle exec rails db:seed
    docker compose up rails
  else
    echo "!!! Starting Rails Local !!!"
    bundle check || bundle install --without production
    bundle exec rails db:create
    bundle exec rails db:migrate
    bundle exec rails db:seed
    bundle exec rails s -p 3001 -b "ssl://api-local.youtubesharing.com:3001?key=local-cert/api-local.youtubesharing.com.key&cert=local-cert/api-local.youtubesharing.com.crt"
  fi
}

start_react() {
  cd frontend/youtube-sharing
  npm install
  npm start &
  WEBPACK_ID=$!
  trap "kill -- -$WEBPACK_ID" EXIT INT
  trap "pkill webpack" EXIT INT
}

echo "Prepare environment variables"
cp .env.example .env
cp frontend/youtube-sharing/.env.example frontend/youtube-sharing/.env

echo "!!! Starting docker !!!"
start_docker

echo "!!! Starting React !!!"
start_react

echo "!!! Starting Rails !!!"
start_rails
