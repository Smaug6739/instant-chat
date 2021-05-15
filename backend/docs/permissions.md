# Permissions
This is the list of available permissions for members and their values

| Name     | Value    | Description               |
|----------|:-------:|----------------------------|
| ADMINISTRATOR | 1  | Has all permissions        |
| VIEW_MEMBERS  | 2  | Can see registered members |
| UPDATE_MEMBERS| 4  | Can update members         |
| DELETE_MEMBERS| 8  | Can delete members         |
| BAN_MEMBERS   | 16 | Can ban members            |

* Note : Only user with administrator permission can modify permissions of others users.

* For add the first user with administrator permission you need modify this user in database.

* For add multiples permissions to a user add the values of permissions.
Exemple : For create user with `ADMINISTRATOR` and `UPDATE_MEMBERS` : `1 + 5 = 5`. So the permissions for the user is 5. 
  
