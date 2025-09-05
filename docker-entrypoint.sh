#!/usr/bin/env sh
set -eu
envsubst '$LEADERBOARD_API_HOST $LEADERBOARD_API_PORT $LEADERBOARD_API_KEY' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf
exec "$@"