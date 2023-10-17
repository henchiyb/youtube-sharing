#!/bin/bash

set -e 

if [ "$1" == "down" ]; then
  docker compose -f docker-compose-test.yml down react-test rails-test
else
  echo "!!! Starting docker for test !!!"
  docker compose -f docker-compose.yml up -d db redis
  docker compose -f docker-compose-test.yml build rails-test
  docker compose -f docker-compose-test.yml up -d --force-recreate
  bundle install
  RAILS_ENV=test bin/rails db:create db:migrate
  echo "Done! Please run test by: bundle exec rspec"
fi
