# Meetings API

An API for managing meetings.

## Base URL

http://localhost:3000

## Get all Meetings

### Request

```http
GET /meet
```
# Response
```json
[
  {
    "name": "Meeting1",
    "time": "2024-01-14T12:00:00Z",
    "url": "http://meeting1.com"
  },
  {
    "name": "Meeting2",
    "time": "2024-01-15T14:30:00Z",
    "url": "http://meeting2.com"
  }
]
```

# Create a New Meeting
## Request
```http
POST /meet
Content-Type: application/json

{
  "name": "NewMeeting",
  "time": "2024-01-16T09:00:00Z",
  "url": "http://newmeeting.com"
}
```
## Response
```json
{
  "name": "NewMeeting",
  "time": "2024-01-16T09:00:00Z",
  "url": "http://newmeeting.com"
}
```

# Update a Meeting
## Request
```http
PUT /meet/{id}
Content-Type: application/json

{
  "name": "UpdatedMeeting",
  "time": "2024-01-17T11:30:00Z",
  "url": "http://updatedmeeting.com"
}
```

## Response
```json
{
  "name": "UpdatedMeeting",
  "time": "2024-01-17T11:30:00Z",
  "url": "http://updatedmeeting.com"
}
```

# Delete a Meeting
## Request
```http
DELETE /meet/{id}
```
## Response
```json
{
  "name": "DeletedMeeting",
  "time": "2024-01-18T13:45:00Z",
  "url": "http://deletedmeeting.com"
}
```

## Error Response
```json
{
	"error": "Meeting not found"
}
```

