#!/bin/bash

filename="newResourcesList.log"

while read line
do
    echo "#--> https://gorest.co.in/public-api/$line"
    echo "..."
 
    curl -i -H "Accept:application/json" -H "Content-Type:application/json" -H "Authorization: Bearer ${API_ACCESS_TOKEN}" -XDELETE "https://gorest.co.in/public-api/$line"
    echo
    echo

done < $filename

newFilename="$filename".$(date +'%Y%m%d')
mv $filename $newFilename
