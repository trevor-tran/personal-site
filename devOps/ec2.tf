# key pair to control login access to EC2 instances
resource "tls_private_key" "pk" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "porfolio_kp" {
  key_name   = "porfolio-login" # Create key to AWS!!
  public_key = tls_private_key.pk.public_key_openssh
}

resource "aws_ssm_parameter" "porfolio_ssm" {
  name        = "/porfolio/server/ssh"
  description = "The private key for logging in porfolio EC2 instance"
  type        = "SecureString"
  value       = tls_private_key.pk.private_key_openssh
}


resource "aws_eip" "instance_ip" {
  instance = aws_instance.porfolio_server.id
}

# Create EC2
resource "aws_instance" "porfolio_server" {
  ami                    = "ami-0c2ab3b8efb09f272" # us-west-2
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.porfolio_instance_sg.id]
  key_name               = aws_key_pair.porfolio_kp.key_name
}

# create security group for EC2
resource "aws_security_group" "porfolio_instance_sg" {
  name        = "porfolio-instance-sg"
  description = "security group for porfolio EC2 instance"

  ingress {
    description      = "allow ssh"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}
