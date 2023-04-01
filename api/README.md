# API - Magic Tournament Organizator

The following information in about the endpoint of the application

## Users

| http verb | path                     | status codes  | purpose             |
| --------- | ------------------------ | ------------- | ------------------- |
| GET       | /api/v1/users            | 200, 404      | list for admins     |
| GET       | /api/v1/users/<nickname> | 200, 403, 404 | see your profile    |
| PATCH     | /api/v1/users/<nickname> | 200, 403, 404 | update your profile |

## Tournaments

| http verb | path                               | status codes  | purpose                   |
| --------- | ---------------------------------- | ------------- | ------------------------- |
| GET       | /api/v1/tournaments                | 200, 404      | list for admins           |
| POST      | /api/v1/tournaments                | 201, 400      | create for admins         |
| GET       | /api/v1/tournaments/<idTournament> | 200, 403, 404 | see the detail for admins |
