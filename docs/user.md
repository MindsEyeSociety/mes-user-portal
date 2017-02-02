# User
Allows accessing and manipulating users.

## `GET /v1/user`
Provides a list of users, with optional filtering.

__Params__

* `token` - Required. Parameter or cookie of user token.

* `name` - Search of names.

* `email` - Search by email. Exact search only.

* `mes` - Search by membership number. Exact search only.

* `type` - Search by membership type, full, trial, or suspended. Exact search only.

* `orgUnit` - Show members only under a specific org unit ID and it's descendants.

* `expired` - Shows expired members or not. Defaults to true.

* `limit` - Integer. Number of results to return, defaults to 100.

* `offset` - Integer. Offset for results, defaults to 0.

__Responses__

* __Code__: 200<br>
__Content__: Array of user objects.
```json
[
	{
		"id": 1,
		"membershipNumber": "US2016010001",
		"firstName": "Test",
		"lastName": "Admin",
		"nickname": null,
		"fullName": "Test Admin",
		"membershipType": "Full",
		"membershipExpiration": "2020-01-01T00:00:00.000Z"
	}
]
```

* Org unit specified doesn't exist.<br>
__Code__: 404<br>
__Content__: `{ status: 404, message: 'Org unit not found' }`

* Other errors.<br>
__Code__: 500<br>
__Content__: `{ status: 400, message: 'List failed' }`


## `GET /v1/user/{id}`
Provides details about a given user.

__Params__

* `{id}` - Required. Can be the numeric ID, MES #, or "me" for the current user.

* `token` - Required. Parameter or cookie of user token.

* `private` - Query var that shows private user data _if_ the user has permission. Defaults to false, unless "me" is selected where it's always true.

__Responses__

* __Code__: 200<br>
__Content__: Details of the user. Email and address are hidden without the `private` param.<br>
```
{
	"id": 1,
	"firstName": "Test",
	"lastName": "Admin",
	"nickname": null,
	"address": null,
	"email": "admin@test.com",
	"membershipType": "Full",
	"membershipNumber": "US2016010001",
	"membershipExpiration": "2020-01-01T00:00:00.000Z",
	"orgUnit": {
		"id": 7,
		"name": "Domain of Pending Doom",
		"code": "ME-008",
		"type": "Domain"
	},
	"fullName": "Test Admin"
}
```

* User ID provided is invalid.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid ID provided' }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'User not found' }`


## `PUT /v1/user/{id}`
Updates a user.

__Params__

* `{id}` - Required. Can be the numeric ID, MES #, or "me" for the current user.

* `token` - Required. Parameter or cookie of user token. Needs `user_update` role over user, or be updating self.

__Body__

* `firstName`: First name.

* `lastName`: Last name.

* `nickname`: The nickname.

* `address`: Home address, viewable by officers only.

* `email`: Primary contact email.

* `membershipType`: The type of member.

* `membershipExpiration`: The membership expiration date.

__Responses__

* __Code__: 200<br>
__Content__: Updated details of user.

* User ID provided is invalid.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid ID provided' }`

* No body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'No data provided' }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'User not found' }`

* Invalid body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid data provided: [errors]' }`


## `PUT /v1/user/{id}/assign/{domain}`
Moves a user to a given domain.

__Params__

* `{id}` - Required. Can be the numeric ID, MES #, or "me" for the current user.

* `{domain}` - Required. Numeric ID of the target domain.

* `token` - Required. Parameter or cookie of user token. Needs `user_assign` role over user _or_ domain, or be updating self _if_ not in a domain already.

__Responses__

* __Code__: 200<br>
__Content__: `{ success: true }`

* User ID provided is invalid.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid ID provided' }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'User not found' }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'Domain not found' }`

* Trying to assign to non-domain.<br>
__Code__: 500<br>
__Content__: `{ status: 500, message: 'Assigning to non-domain' }`

* User is already a member of the domain.<br>
__Code__: 500<br>
__Content__: `{ status: 500, message: 'User already member of domain' }`

* If a user is assigning themselves, they can't leave a domain.<br>
__Code__: 403<br>
__Content__: `{ status: 403, message: 'Cannot leave domain' }`

* If a user is assigning themselves, they can't be assigned outside their region.<br>
__Code__: 403<br>
__Content__: `{ status: 403, message: 'Domain not under current region' }`


## `PUT /v1/user/{id}/suspend`
Suspends a user, or restores a suspended user.

__Params__

* `{id}` - Required. Can be the numeric ID, MES #, or "me" for the current user.

* `token` - Required. Parameter or cookie of user token. Needs `user_suspend` role over user.

__Responses__

* __Code__: 200<br>
__Content__: Updated details of user.

* __Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid ID provided' }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'User not found' }`
