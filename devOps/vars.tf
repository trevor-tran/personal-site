variable "region" {
  type        = string
  nullable    = false
  description = "AWS region"
  default     = "us-west-2"
}

variable "repo_branch" {
  type        = string
  nullable    = false
  description = "Repository branch to connect to"
  default     = "master"
}

variable "repo_owner" {
  type        = string
  nullable    = false
  description = "GitHub repository owner"
  default     = "PhuongDTran"
}

variable "repo_name" {
  type        = string
  nullable    = false
  description = "GitHub repository name"
  default     = "personal-site"
}

variable "artifacts_bucket_name" {
  type        = string
  nullable    = false
  description = "S3 Bucket for storing artifacts"
  default     = "porfolio-build-artifacts"
}