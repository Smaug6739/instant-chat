# Update User

Updating a user's account information.

URL : `/api/v1/members/:userId`

Method : `PUT`

Auth required : YES

Permissions required : None

**Data :**

```js
{
    nickname: "[1 to 250 chars]",
    avatar: "[1 to 250 chars]", 
    permissions: "[number]",
    banishment: "[timestamp]",
    avatar : "[1 to 200 chars]",
    password: "[1 to 50 chars]",
    first_name: "[1 to 250 chars]",
    last_name: "[1 to 250 chars]",
    age: "[number]",
    phone_number: "[1 to 30 chars]",
    email: "[1 to 250 chars]"
}
```

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
## Notes 
If the logged in user tries to update a user other than himself, he needs a permissions level greater than or equal to 3.

