# API - Magic Tournament Organizator
The following information in about the endpoint of the application

## Users

| http verb | path                    | status codes  | purpose             |
|-----------|-------------------------|---------------|---------------------|
| GET       | /api/v1/users           | 200, 404      | list for admins     |
| GET       | /api/v1/user/<nickname> | 200, 403, 404 | see your profile    |
| PATCH     | /api/v1/user/<nickname> | 200, 403, 404 | update your profile |