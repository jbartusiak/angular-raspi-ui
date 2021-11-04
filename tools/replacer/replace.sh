#!/bin/bash

echo "${HOST_IP_ADDRESS}"
echo "Executing replacer"
sed -i "s|HOST_IP_ADDRESS|${HOST_IP_ADDRESS}|g" /usr/share/nginx/html/*.js
