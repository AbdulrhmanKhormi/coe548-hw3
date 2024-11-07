#!/bin/bash

# Define the base API URL
API_URL="https://nuggkotgd0.execute-api.us-east-1.amazonaws.com"

# Define test cases
declare -A test_cases=(
	["add"]='{"X": 5, "Y": 3}'
	["sub"]='{"X": 10, "Y": 4}'
	["mul"]='{"X": 7, "Y": 6}'
	["div"]='{"X": 20, "Y": 4}'
)

# Test each endpoint
for operation in "${!test_cases[@]}"; do
	echo "Testing $operation endpoint..."
	response=$(curl -s -X POST "$API_URL/$operation" \
		-H "Content-Type: application/json" \
		-d "${test_cases[$operation]}")
	echo "Response from $operation:" "$response"
	echo
done
