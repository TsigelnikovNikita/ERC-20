#!/bin/bash

# Use this script for verify your smart-contract on the etherscan.
# arguments of the contructor is taken from the arguments.js file. You can modify it.
# Netwrok name and contract address are passed to the script.

NETWORK_NAME=$1
CONTRACT_ADDRESS=$2

npx hardhat verify --network $NETWORK_NAME --constructor-args arguments.js $CONTRACT_ADDRESS
