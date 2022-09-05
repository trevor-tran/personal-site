# key pair to control login access to EC2 instances
resource "tls_private_key" "pk" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "porfolio_kp" {
  key_name   = "porfolio-login" # Create key to AWS!!
  public_key = tls_private_key.pk.public_key_openssh
}

resource "aws_eip" "instance_ip" {
  instance = aws_instance.porfolio_instance.id
}

# Create EC2
resource "aws_instance" "porfolio_instance" {
  ami                    = "ami-0c2ab3b8efb09f272" # us-west-2
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.porfolio_instance_sg.id]
  key_name               = aws_key_pair.porfolio_kp.key_name
  user_data              = file("ec2_user_data.sh")
  iam_instance_profile   = aws_iam_instance_profile.porfolio_instance_profile.name

  tags = {
    target = "porfolio-server"
  }
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

  ingress {
    description      = "allow http"
    from_port        = 80
    to_port          = 80
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

resource "aws_iam_instance_profile" "porfolio_instance_profile" {
  name = "porfolio-instance-profile"
  role = aws_iam_role.porfolio_instance_role.name
}

# resource "aws_iam_policy_attachment" "porfolio_instance_policy_attachment" {
#   name       = "porfolio-instance-policy-attachment"
#   roles      = [aws_iam_role.porfolio_instance_role.name]
#   policy_arn = aws_iam_role_policy.porfolio_instance_policy.arn
# }

resource "aws_iam_role_policy" "porfolio_instance_policy" {
  name = "porfolio-instance-policy"
  role = aws_iam_role.porfolio_instance_role.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "ec2:RunInstances",
          "ec2:AssociateIamInstanceProfile",
          "ec2:ReplaceIamInstanceProfileAssociation"
        ],
        "Resource" : "*"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:GetObject",
          "s3:List*",
        ],
        "Resource" : [
          "${aws_s3_bucket.porfolio_build_artifacts.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role" "porfolio_instance_role" {
  name = "porfolio-instance-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
