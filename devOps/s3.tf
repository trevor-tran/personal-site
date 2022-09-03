resource "aws_s3_bucket" "codebuild_artifacts" {
  bucket = "porfolio-codebuild-artifacts"
}

resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.codebuild_artifacts.id
  acl    = "private"
}
