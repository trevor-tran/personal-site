resource "aws_codebuild_project" "porfolio_codebuild" {
  name         = "porfolio-codebuild"
  description  = "build porfolio project"
  service_role = aws_iam_role.codebuild_role.arn

  artifacts {
    type      = "S3"
    location  = aws_s3_bucket.codebuild_artifacts.bucket
    path      = "/"
    packaging = "ZIP"
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
    type      = "GITHUB"
    location  = "https://github.com/PhuongDTran/personal-site.git"
    buildspec = "buildspec.yaml"

    git_submodules_config {
      fetch_submodules = true
    }
  }
  source_version = "master"
}


resource "aws_codebuild_source_credential" "example" {
  auth_type   = "PERSONAL_ACCESS_TOKEN"
  server_type = "GITHUB"
  token       = data.aws_ssm_parameter.github_token.value
}

resource "aws_codebuild_webhook" "porfolio_codebuild_webhook" {
  project_name = aws_codebuild_project.porfolio_codebuild.name
  build_type   = "BUILD"
  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PUSH"
    }

    filter {
      type    = "HEAD_REF"
      pattern = "master"
    }
  }
}