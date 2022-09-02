##########################################################
#
# A script to start/stop EC2 instance
#
##########################################################


#!/bin/bash

PROFILE=site-dev
REGION=us-west-2
INSTANCE_ID=$(terraform output --raw instance_id)

# get instance state
state=$(aws --profile $PROFILE --region=$REGION ec2 describe-instances \
  --instance-id $INSTANCE_ID --output text \
  --query Reservations[].Instances[].State.Name)

# start/stop instance depending on current EC2 instance state
if [[ $state == "running" ]]; then
  read -p "instance state: \"$state\". Stop instance (y or n)? " response
  if [[ $response == "y"* || $response == "Y" ]]; then
    aws --profile $PROFILE --region=$REGION ec2 stop-instances --instance-ids $INSTANCE_ID
  else
    exit 0
  fi
elif [[ $state == "stopped" ]]; then
  read -p "instance state: \"$state\". Start instance (y or n)? " response
  if [[ $response == "y"* || $response == "Y" ]]; then
    aws --profile $PROFILE --region=$REGION ec2 start-instances --instance-ids $INSTANCE_ID
  else
    exit 0
  fi
else
  echo "instance state: \"$state\". No action required."
fi
