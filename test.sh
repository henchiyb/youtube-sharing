#!/bin/bash

set -e 

echo "!!! Starting docker for test !!!"
docker compose -f docker-compose.yml up -d db redis
docker compose -f docker-compose-test.yml build rails-test
docker compose -f docker-compose-test.yml up -d --force-recreate
bundle install
bundle exec rspec "$1"
docker compose -f docker-compose-test.yml down
echo "Done!"