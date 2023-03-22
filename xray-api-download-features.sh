TEST_PLAN_KEY="$1"
if [ "$TEST_PLAN_KEY" == "" ]; then
    echo "TEST_PLAN_KEY missing. Usage: ./xray-api-downlaoad-features.sh <TEST_PLAN_KEY>"
    exit 1
fi
if [ "$XRAY_CLIENT_ID" == "" ]; then
    echo "XRAY_CLIENT_ID env var is empty"
    exit 1
fi
if [ "$XRAY_CLIENT_SECRET" == "" ]; then
    echo "XRAY_CLIENT_SECRET env var is empty"
    exit 1
fi
token=$(curl -H "Content-Type: application/json" -X POST --data "{ \"client_id\": \"$XRAY_CLIENT_ID\",\"client_secret\": \"$XRAY_CLIENT_SECRET\" }" https://xray.cloud.getxray.app/api/v2/authenticate| tr -d '"')
cd features
rm *
curl -H "Content-Type: application/json" -X GET -H "Authorization: Bearer ${token}" "https://xray.cloud.getxray.app/api/v2/export/cucumber?keys=$TEST_PLAN_KEY" -o featureBundle.zip
unzip -j -o featureBundle.zip
