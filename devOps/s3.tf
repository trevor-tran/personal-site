resource "aws_s3_bucket" "porfolio_build_artifacts" {
  bucket = var.artifacts_bucket_name
}

resource "aws_s3_bucket_acl" "codepipeline_bucket_acl" {
  bucket = aws_s3_bucket.porfolio_build_artifacts.id
  acl    = "private"
}
resource "aws_s3_bucket_policy" "allow_access_from_porfolio_codebuild" {
  bucket = aws_s3_bucket.porfolio_build_artifacts.id
  policy = data.aws_iam_policy_document.allow_access_from_porfolio_codebuild.json
}

data "aws_iam_policy_document" "allow_access_from_porfolio_codebuild" {
  statement {
    principals {
      type        = "AWS"
      identifiers = [aws_iam_role.codebuild_role.arn]
    }

    actions = [
      "s3:*"
    ]

    resources = [
      aws_s3_bucket.porfolio_build_artifacts.arn,
      "${aws_s3_bucket.porfolio_build_artifacts.arn}/*",
    ]
  }
}