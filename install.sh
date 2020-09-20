#!/bin/bash -x

source ./.env

PROFILE=${AWS_PROFILE:-'default'}

aws s3 \
    mb s3://$DEPLOY_BUCKET \
    --profile $PROFILE \
    --region $AWS_DEFAULT_REGION

aws s3 \
    website s3://$DEPLOY_BUCKET \
    --index-document index.html \
    --error-document index.html \
    --profile $PROFILE \
    --region $AWS_DEFAULT_REGION

cd wp-frontend
npm test
npm run build
cd ..

aws s3 \
    cp --recursive \
    ./wp-frontend/build s3://$DEPLOY_BUCKET \
    --acl public-read \
    --profile $PROFILE \
    --region $AWS_DEFAULT_REGION

echo "website endpoint:  http://$DEPLOY_BUCKET.s3-website-$AWS_DEFAULT_REGION.amazonaws.com"