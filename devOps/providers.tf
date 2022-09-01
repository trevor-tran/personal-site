# Configure the AWS Provider
provider "aws" {
  region                   = "us-west-2"
  shared_config_files      = ["~/.aws/config"]
  shared_credentials_files = ["~/.aws/credentials"]
  profile                  = "site-dev"
}