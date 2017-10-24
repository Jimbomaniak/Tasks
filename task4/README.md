### Routes

Route | Method | BODY | Description
--- | :---: | :---: | ---
`/users` | GET | - | List all users
`/users/id` | GET | - | Get user with ID (hex format)
`/users/` | POST | {"name": "Vasya", "email" : "vasya@asf.com"} | Create new user with email
`/users/id` | DELETE | - | Delete user with ID (hex format)
`/messages` | GET | - | List all messages
`/messages/id`| GET | - | Get  messages with ID (hex format)
`/messages/` | POST | {"senderId": 1, "receiverId": 2, "message": {"date": "(not need)","text": "message"} | Create new message
`/messages/id` | PUT | {"text": "i change this message"} | Edit message 1 text
`/messages/id` | DELETE | - | Delete message with ID in hex format
