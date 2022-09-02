##########################################################
#
# A script to login to EC2 instance created by Terraform
#
##########################################################


#!/bin/bash

PROFILE=site-dev
REGION=us-west-2
USERNAME="ec2-user"

# get output values from terraform
IP_ADDR=$(terraform output --raw instance_ip_addr)
SSM_NAME=$(terraform output --raw porfolio_ssm_name)

# descrypt private key stored in SSM Parameter
private_key=$(aws --profile=$PROFILE --region=$REGION \
  ssm get-parameter --name $SSM_NAME --with-decryption \
  --output text --query 'Parameter.Value')

ssh-add - <<< "${private_key}"
ssh $USERNAME@$IP_ADDR