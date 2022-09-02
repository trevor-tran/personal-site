#!/bin/bash
sudo yum update -y
sudo yum install -y httpd
sudo yum install -y ruby
sudo yum install -y wget

# install CodeDeploy agent
cd /home/ec2-user
wget https://aws-codedeploy-us-west-2.s3.us-west-2.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto

# start http server
sudo systemctl start httpd
sudo systemctl enable httpd

