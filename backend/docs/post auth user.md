# Auth User

Get the details of the currently Authenticated User along with basic subscription information.

URL : `/api/v1/members`

Method : `POST`

Auth required : NO

Permissions required : None

**Data :**

```json
{
    "email": "[1 to 250 chars]",
    "password": "[1 to 250 chars]",
}
```

## Success Response

Code : `201 Created`

**Content examples**

```json
{
    "status": "success",
    "timestamp": 1616316242815,
    "result": {
        "auth": {
            "auth": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTYzMzc4NDIsImV4cGlyZXNJbiI6MjAwMDAsInVzZXJJZCI6MiwidXNlclBlcm1pc3Npb25zIjoxLCJpYXQiOjE2MTYzMTYyNDJ9.KvVubThCfOvlp0o0_gg_VR_f0fToeS2aueLwHqu-oGM",
            "client_id": 2
        },
        "user": {
            "id": 2,
            "nickname": "Smaug",
            "permissions": 1,
            "banishment": 1,
            "avatar": "default.png",
            "password": "$2b$10$bDCVeMGn8gKZSFMxmPMjDeTSuYSPa3Z5E8nHKFjd1exg1JV1K7iNi",
            "first_name": "first name",
            "last_name": "last name",
            "age": "15",
            "phone_number": "00 00 00 00 00",
            "email": "test@mail.com",
            "date_insert": 1615924296609
        }
    }
}
```
