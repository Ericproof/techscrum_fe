PAYLOAD='{"user": "TheUnstoppables2019:ATBBKxmdFWwpnNVyvcF8KYZJbTxy98EC005C"}'

RESPONSE=`curl --request GET -H "Content-Type:application/json" https://api.bitbucket.org/2.0/repositories/010001/fe.techscrum/pullrequests/293	 --data "${PAYLOAD}"` | jq '.source.branch.name'

http_code=$(tail -n1 <<< "$RESPONSE")  # get the last line
content=$(sed '$ d' <<< "$RESPONSE")   # get all but the last line which contains the status code

TOKEN=`echo $RESPONSE | grep -Po '"source":(\W+)?"\K[a-zA-Z0-9._]+(?=")'`

echo $RESPONSE
