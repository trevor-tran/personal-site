resource "aws_ssm_parameter" "porfolio_ssm" {
  name        = "/porfolio/server/ssh"
  description = "The private key for logging in porfolio EC2 instance"
  type        = "SecureString"
  value       = tls_private_key.pk.private_key_openssh
}

data "aws_ssm_parameter" "github_token" {
  name            = "/porfolio/server/github"
  with_decryption = true
}