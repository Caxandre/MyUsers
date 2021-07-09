## About the project

Simple API to register, list, edit and remove users. Built with NodeJS and Typescript.

## Installation

The following steps will help install and run MyUsers on your local computer.

1. git clone https://github.com/Caxandre/MyUsers.git;

2. Go to the MyUsers folder and install all project dependencies with **_npm install_** or **_yarn install_**;

3. Start the development server with **_npm dev_** or **_yarn dev_**.
## Tests

To run the tests use the command **_npm run test_** or **_yarn test_**.

## Endpoints
#### POST /users

Create a new user.
##### Request
```json
Body

{
  "name": "New User",
  "email": "newuser@email.com",
  "pictureUrl": "https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg"
}
```

| Field | Type | Description |
| ---- | ----- | --------- |
| name | string | User name to be registered
| email | string | Email of the user to be registered
| pictureUrl | string | Image url

##### Response - 200
```json
Returns an object

{
  "id": "ff278c58-c59a-4acd-a8d3-b068376db6b0",
  "name": "New User",
  "email": "newuser@email.com",
  "pictureUrl": "https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg",
  "created_at": "2021-07-09T16:47:18.792Z"
}
```

| Field | Type | Description |
| ---- | ---- | ---------- |
| id | string | User id registered in the system |
| name | string | User name |
| email | string | User email |
| pictureUrl | string |Image url |
| created_at | date | User registration creation date |

#### GET /users

List all registered users. Allows search by username.

##### Request

```json
/users?page=2&per_page=2&name=maria
```

| Query Param | Type | Description | Send |
| ---- |------| ----------- | ------|
| :page | number | Current page number | Optional |
| :per_page | number | Items per page | Optional |
| :name | string | User name search | Optional |

##### Response - 200

```json
Returns data for paging and array containing registered users

{
  "page": 1,
  "per_page": 10,
  "pre_page": null,
  "next_page": null,
  "total": 1,
  "total_pages": 1,
  "users": [
    {
      "id": "0cde1cd8-2b75-4a28-af2b-980e6ed05704",
      "name": "maria",
      "email": "maria@email.com",
      "pictureUrl": "https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg",
      "created_at": "2021-07-09T17:11:21.993Z"
    }
  ]
}
```

| Field | Type | Description |
| ---- | ---- | ---------- |
| page | number | Current page number |
| per_page | number | Items per page |
| pre_page | number | Number of previous pages |
| next_page | number |Number of subsequent pages |
| total | number | Total number of records |
| total_pages | number | Total number of pages |
| users | array | Array containing registered users |

#### GET /users/:id

Show user details.

##### Request

```json
/users/ff278c58-c59a-4acd-a8d3-b068376db6b0
```
##### Response - 200
```json
Returns an object

{
  "id": "ff278c58-c59a-4acd-a8d3-b068376db6b0",
  "name": "Update New User",
  "email": "updatenewuser@email.com",
  "pictureUrl": "https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg",
  "created_at": "2021-07-09T16:47:18.792Z"
}
```

| Field | Type | Description |
| ---- | ---- | ---------- |
| id | string | User id registered in the system |
| name | string | User name |
| email | string | User email |
| pictureUrl | string | Image url |
| created_at | date | User registration creation date |

#### PUT /users

Update an existing user.
##### Request

```json
/users/ff278c58-c59a-4acd-a8d3-b068376db6b0

Body:

{
  "name": "Update New User",
  "email": "updatenewuser@email.com",
  "pictureUrl": "https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg"
}
```

| Field | Type | Description | Send |
| ---- | ----- | --------- | ----- |
| name | string | User name to be registered | Optional |
| email | string | Email of the user to be registered | Optional |
| pictureUrl | string | Image url | Optional |

##### Response - 200
```json
Returns an object

{
  "id": "ff278c58-c59a-4acd-a8d3-b068376db6b0",
  "name": "Update New User",
  "email": "updatenewuser@email.com",
  "pictureUrl": "https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg",
  "created_at": "2021-07-09T16:47:18.792Z"
}
```

| Field | Type | Description |
| ---- | ---- | ---------- |
| id | string | User id registered in the system |
| name | string | User name |
| email | string | User email |
| pictureUrl | string | Image url
| created_at | date | User registration creation date |


#### DELETE /users/:id

Remove an existing user from the application.

##### Request

```json
/users/ff278c58-c59a-4acd-a8d3-b068376db6b0
```

## Contact

Carlos Perrout - carlosperrout@gmail.com.br
