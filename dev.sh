start_db () {
  docker compose up -d db
}

start_rails() {
  bundle check || bundle install --without production
  bundle exec rails db:create
  bundle exec rails db:migrate
  bundle exec rails s
}

echo "!!! Starting DB !!!"
start_db

echo "!!! Starting Rails !!!"
start_rails
