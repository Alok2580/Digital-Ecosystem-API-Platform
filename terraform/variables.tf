variable "aws_region" {
  description = "AWS region"
  default     = "ap-northeast-1"
}

variable "cluster_name" {
  description = "EKS cluster name"
  default     = "digital-ecosystem"
}

variable "subnet_ids" {
  type        = list(string)
  description = "Subnets for the cluster nodes"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID"
}
