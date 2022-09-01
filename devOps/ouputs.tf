output "instance_ip_addr" {
  value = aws_instance.porfolio_server.public_ip
  description = "The public IP address of the porfolio instance"
}

output "porfolio_ssm_name" {
  value = aws_ssm_parameter.porfolio_ssm.name
  description = "SSM Parameter name for EC2 Instance login private key"
}
