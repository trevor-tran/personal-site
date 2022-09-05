resource "aws_codedeploy_app" "porfolio" {
  compute_platform = "Server"
  name             = "porfolio-codedeploy-app"
}

resource "aws_codedeploy_deployment_config" "porfolio" {
  deployment_config_name = "porfolio-codedeploy-config"

  minimum_healthy_hosts {
    type  = "HOST_COUNT"
    value = 1
  }
}

resource "aws_codedeploy_deployment_group" "porfolio" {
  app_name               = aws_codedeploy_app.porfolio.name
  deployment_group_name  = "porfolio-codedeploy-group"
  service_role_arn       = aws_iam_role.porfolio_codedeploy_role.arn
  deployment_config_name = "CodeDeployDefault.AllAtOnce"

  ec2_tag_filter {
    key   = "target"
    type  = "KEY_AND_VALUE"
    value = "porfolio-server"
  }

  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }

  # alarm_configuration {
  #   alarms  = ["my-alarm-name"]
  #   enabled = true
  # }
}

resource "aws_iam_role_policy_attachment" "AWSCodeDeployRole" {
  role = aws_iam_role.porfolio_codedeploy_role.name
  # policy_arn = aws_iam_policy.porfolio_codedeploy_policy.arn
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
}

resource "aws_iam_role" "porfolio_codedeploy_role" {
  name = "porfolio-codedeploy-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "codedeploy.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "porfolio_codedeploy_policy" {
  name   = "porfolio-codedeploy-policy"
  policy = data.aws_iam_policy_document.allow_access_to_porfolio_codedeploy.json
}

data "aws_iam_policy_document" "allow_access_to_porfolio_codedeploy" {
  statement {


    actions = [
      "codedeploy:*"
    ]

    resources = [
      aws_codedeploy_deployment_group.porfolio.arn
    ]
  }
}
