#!/usr/bin/env sh
echo "Run DB initial migrate"
npm run mig:up

echo "Run API server"
npm run start