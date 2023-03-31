# API - Magic Tournament Organizator
The following information in about the endpoint of the application

## Users

| http verb | path                    | status codes  | purpose             |
|-----------|-------------------------|---------------|---------------------|
| GET       | /api/v1/users           | 200, 404      | list for admins     |
| GET       | /api/v1/user/<nickname> | 200, 403, 404 | see your profile    |
| PATCH     | /api/v1/user/<nickname> | 200, 403, 404 | update your profile |

## Tournaments

| http verb | path                              | status codes  | purpose                   |
|-----------|-----------------------------------|---------------|---------------------------|
| GET       | /api/v1/tournaments               | 200, 404      | list for admins           |
| POST      | /api/v1/tournaments               | 201, 400      | create for admins         |
| GET       | /api/v1/tournament/<idTournament> | 200, 403, 404 | see the detail for admins |

## Match

| http verb | path                              | status codes  | purpose                    |
|-----------|-----------------------------------|---------------|----------------------------|
| PATCH     | /api/v1/tournament/<idTournament> | 200, 403, 404 | update match of tournament |