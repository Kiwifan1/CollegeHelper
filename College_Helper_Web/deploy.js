const dotenv = require("dotenv");
const { execSync } = require("child_process");

// Load environment variables from .env
dotenv.config();

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET, AWS_REGION } =
  process.env;

try {
  // Run the deployment command using ngx-aws-deploy
  execSync(
    `npx cross-env NG_DEPLOY_AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} NG_DEPLOY_AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} NG_DEPLOY_AWS_BUCKET=${AWS_BUCKET} NG_DEPLOY_AWS_REGION=${AWS_REGION} ng deploy`,
  );
  console.log("Deployment completed successfully!");
} catch (error) {
  console.error("Deployment failed:", error.message);
}
