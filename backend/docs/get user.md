# Show Current User

Get the details of the currently Authenticated User along with basic subscription information.

URL : `/api/v1/members/:userId`

Method : `GET`

Auth required : YES

Hearders : `Authorization : <userAuthId> <userAuthToken>`

Permissions required : None

## Success Response

Code : `200 OK`

**Content examples**

```json
{
    "status": "success",
    "timestamp": 1616314742091,
    "result": {
        "id": 2,
        "nickname": "Smaug",
        "permissions": 1,
        "banishment": 1,
        "avatar": "avatar.png",
        "password": "$2b$10$b8RCKoLwcdGtdpTn3oIG/ubtTiCncJtUnPy1DZfi3QzKZ1jEun3uO",
        "first_name": "first name",
        "last_name": "last name",
        "age": "15",
        "phone_number": "00 00 00 00 00",
        "email": "mail@domain.com",
        "date_insert": 1615924296609
    }
}
```

Notes
If the logged in user tries to retrieve a user other than himself, he needs a permissions level greater than or equal to 3.
