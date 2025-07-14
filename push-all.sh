#!/bin/bash

# Auth service
docker build -t arbaz892/auth-service ./services/auth-service
docker push arbaz892/auth-service

# User service
docker build -t arbaz892/user-service ./services/user-service
docker push arbaz892/user-service

# Order service
docker build -t arbaz892/order-service ./services/order-service
docker push arbaz892/order-service

# Product service
docker build -t arbaz892/product-service ./services/product-service
docker push arbaz892/product-service
