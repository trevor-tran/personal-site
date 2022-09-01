##########################################################
#
# A script to login to EC2 instance created by Terraform
#
##########################################################

#!/bin/bash
# get output values from terraform
ip_addr=$(terraform output --raw instance_ip_addr)
ssm_name=$(terraform output --raw porfolio_ssm_name)

# default username in EC2s
username="ec2-user"

# descrypt private key stored in SSM Parameter
private_key=$(aws --profile=site-dev --region=us-west-2 ssm get-parameter --name /porfolio/server/ssh --with-decryption --output text --query 'Parameter.Value')

ssh-add - <<< "${private_key}"
ssh $username@$ip_addr