resource "aws_codepipeline" "porfolio_codepipeline" {
  name     = "porfolio-codepipeline"
  role_arn = aws_iam_role.porfolio_codepipeline_role.arn

  artifact_store {
    type     = "S3"
    location = aws_s3_bucket.porfolio_build_artifacts.bucket
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn    = aws_codestarconnections_connection.porfolio_github_connection.arn
        FullRepositoryId = "${var.repo_owner}/${var.repo_name}"
        BranchName       = var.repo_branch
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]
      version          = "1"

      configuration = {
        ProjectName = "porfolio-codebuild"
      }
    }
  }

  # stage {
  #   name = "Deploy"

  #   action {
  #     name            = "Deploy"
  #     category        = "Deploy"
  #     owner           = "AWS"
  #     provider        = "CloudFormation"
  #     input_artifacts = ["build_output"]
  #     version         = "1"

  #     configuration = {
  #       ActionMode     = "REPLACE_ON_FAILURE"
  #       Capabilities   = "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM"
  #       OutputFileName = "CreateStackOutput.json"
  #       StackName      = "MyStack"
  #       TemplatePath   = "build_output::sam-templated.yaml"
  #     }
  #   }
  # }
}

resource "aws_codestarconnections_connection" "porfolio_github_connection" {
  name          = "porfolio-github-connection"
  provider_type = "GitHub"
}

// The aws_codestarconnections_connection resource is created in the state PENDING.
// Authentication with the connection provider must be completed in the AWS Console
resource "aws_codepipeline_webhook" "porfolio" {
  name            = "github-webhook-porfolio"
  authentication  = "GITHUB_HMAC"
  target_action   = "Source"
  target_pipeline = aws_codepipeline.porfolio_codepipeline.name

  authentication_configuration {
    secret_token = random_password.shared_secret.result
  }

  filter {
    json_path    = "$.ref"
    match_equals = "refs/heads/{Branch}"
  }
}

# A shared secret between GitHub and AWS that allows AWS
# CodePipeline to authenticate the request came from GitHub
resource "random_password" "shared_secret" {
  length  = 99
  special = true
}

# Wire the CodePipeline webhook into a GitHub repository.
resource "github_repository_webhook" "porfolio" {
  repository = var.repo_name

  configuration {
    url          = aws_codepipeline_webhook.porfolio.url
    content_type = "json"
    insecure_ssl = true
    secret       = random_password.shared_secret.result
  }

  events = ["push"]
}

resource "aws_iam_role" "porfolio_codepipeline_role" {
  name = "porfolio-codepipeline-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "porfolio_codepipeline_policy" {
  name = "porfolio-codepipeline_policy"
  role = aws_iam_role.porfolio_codepipeline_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
            "Effect": "Allow",
            "Action": "codestar-connections:UseConnection",
            "Resource": "${aws_codestarconnections_connection.porfolio_github_connection.arn}"
        },
    {
      "Effect":"Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:GetBucketVersioning",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "${aws_s3_bucket.porfolio_build_artifacts.arn}",
        "${aws_s3_bucket.porfolio_build_artifacts.arn}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}
