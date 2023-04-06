# API - Magic Tournament Organizator

The following information in about the endpoint of the application

## Authentication

| http verb | path             | status codes | purpose                      |
| --------- | ---------------- | ------------ | ---------------------------- |
| POST      | /api/v1/register | 201, 400     | register user in application |
| POST      | /api/v1/login    | 200, 400     | login application            |
| DELETE    | /api/v1/logout   | 204, 401     | logout application           |

## Users

| http verb | path                     | status codes  | purpose             |
| --------- | ------------------------ | ------------- | ------------------- |
| GET       | /api/v1/users            | 200, 404      | list for admins     |
| GET       | /api/v1/users/<nickname> | 200, 401, 404 | see your profile    |
| PATCH     | /api/v1/users/<nickname> | 200, 401, 404 | update your profile |

## Tournaments

| http verb | path                               | status codes  | purpose                      |
| --------- | ---------------------------------- | ------------- | ---------------------------- |
| GET       | /api/v1/tournaments                | 200, 404      | list for admins              |
| POST      | /api/v1/tournaments                | 201, 400      | create for admins            |
| GET       | /api/v1/tournaments/<idTournament> | 200, 401, 404 | see the detail for admins    |
| DELETE    | /api/v1/tournaments/<idTournament> | 204, 401, 404 | detele tournament for admins |

## Matches

| http verb | path                      | status codes | purpose           |
| --------- | ------------------------- | ------------ | ----------------- |
| GET       | /api/v1/matches/<idMatch> | 200, 401     | list for admins   |
| PATCH     | /api/v1/matches/<idMatch> | 200, 401     | create for admins |
