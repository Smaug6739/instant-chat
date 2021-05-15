# Delete User

Removes account information from a user

URL : `/api/v1/members/:userId`

Method : `DELETE`

Auth required : YES

Hearders : `Authorization : <userAuthId> <userAuthToken>`

Permissions required : None

## Success Response

Code : `200 OK`

**Content examples**

```json
{
    "status": "success",
    "timestamp": 1616316138852,
    "result": {
        "fieldCount": 0,
        "affectedRows": 0,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

Notes
If the logged in user tries to delete a user other than himself, he needs a permissions level greater than or equal to 3.
