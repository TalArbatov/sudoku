#!/bin/bash

echo "Deleted node_modules..."

rm -rf node_modules
rm -rf .git

echo "copying files..."

# TODO: verbose
scp -r /Users/tal/new-dev/suduku-1 root@64.176.164.119:/root/dev/

