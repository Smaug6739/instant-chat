# Create User

Get the details of the currently Authenticated User along with basic subscription information.

URL : `/api/v1/members`

Method : `POST`

Auth required : NO

Permissions required : None

**Data :**

```js
{
    nickname: "[1 to 250 chars]",
    avatar: "[1 to 250 chars]",
    password: "[1 to 250 chars]",
    first_name: "[1 to 250 chars]",
    last_name: "[1 to 250 chars]",
    age: "[1 to 3 chars]",
    phone_number: "[1 to 30 chars]",
    email: "[1 to 250 chars]"
}
```

## Success Response

Code : `201 Created`

**Content examples**

```json
{
    "status": "success",
    "timestamp": 1616315201812,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 7,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
