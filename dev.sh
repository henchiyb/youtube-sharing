start_db () {
  docker compose up -d db
}

start_rails() {
  bundle check || bundle install --without production
  bundle exec rails db:create
  bundle exec rails db:migrate
  bundle exec rails s -p 3001
}

start_react() {
  cd frontend/youtube-sharing
  npm install
  npm start &
}

echo "!!! Starting DB !!!"
start_db

echo "!!! Starting React !!!"
start_react

echo "!!! Starting Rails !!!"
start_rails
