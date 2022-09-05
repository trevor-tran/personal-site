resource "aws_codebuild_project" "porfolio_codebuild" {
  name          = "porfolio-codebuild"
  description   = "build porfolio project"
  service_role  = aws_iam_role.porfolio_codebuild_role.arn
  build_timeout = "15"

  artifacts {
    type                   = "CODEPIPELINE"
    override_artifact_name = true
    encryption_disabled    = true
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:6.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
  }

  logs_config {
    cloudwatch_logs {
      group_name = "porfolio-codebuild-logs"
    }
  }

  source {
    type         = "CODEPIPELINE"
    buildspec    = "buildspec.yaml"
    insecure_ssl = false

    git_submodules_config {
      fetch_submodules = true
    }
  }
}

resource "aws_iam_role" "porfolio_codebuild_role" {
  name = "codebuild-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "porfolio_codebuild_policy" {
  role = aws_iam_role.porfolio_codebuild_role.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    }

  ]
}
POLICY
}