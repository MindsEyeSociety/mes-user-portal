# Office
Allows accessing and manipulation of offices.

## `GET /v1/office/{id}`
Provides information about an office.

__Params__

* `{id}` - Required. Integer ID of office.

* `token` - Required. Parameter or cookie of user token.

__Responses__

* __Code__: 200<br>
  __Content__:<br>
```
{
	"id":1,
	"name":"National Coordinator",
	"email":"nc@mindseyesociety.org",
	"type":"Primary",
	"roles":[
		"user_read_private",
		"user_update",
		"..."
	],
	"parents":[],
	"children":[
		{
			"id":3,
			"name":"Regional Coordinator",
			"type":"Primary"
		},
		{
			"id":9,
			"name":"aRC Membership",
			"type":"Assistant"
		}
	],
	"orgUnit":{
		"id":1,
		"name":"United States",
		"code":"US",
		"type":"Nation"
	},
	"user":{
		"id":2,
		"membershipNumber":"US2016010002",
		"firstName":"Test",
		"lastName":"NC",
		"nickname":null,
		"fullName":"Test NC",
		"membershipType":"Full",
		"membershipExpiration":"2020-01-01T00:00:00.000Z"
	}
}
```

* __Code__: 404<br>
  __Content__: `{ status: 404, message: 'Office not found' }`

## `GET /v1/office/me`
Provides an array of the current user offices.

__Params__

* `token` - Required. Parameter or cookie of user token.

__Responses__

* __Code__: 200<br>
  __Content__:<br>
```
[
	{
		"id":7,
		"name":"DC",
		"email":null,
		"type":"Primary",
		"parentOfficeID":null,
		"parentPath":"1.3.7",
		"parentOrgID":3,
		"userID":8,
		"roles":[ "Array of roles" ]
	}
]
```

## `GET /v1/office/roles`
Provides a human-readable list of roles.


__Responses__

* __Code__: 200<br>
__Content__: `{ user_read_private: 'Read private user data', [...] }`


## `PUT /v1/office/{id}`
Updates data for a given office.

__Params__

* `id` - Required. ID of office to change.

* `token` - Required. Parameter or cookie of user token. Needs `office_update` role over office.

__Body__

* `name` - Name of office.

* `email` - The office email.

* `roles` - Array of roles.

__Responses__

* __Code__: 200<br>
__Content__: The modified JSON. See `GET office/{id}`, above.

* No body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'No data provided' }`

* Invalid body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid data provided: [errors]' }`


## `PUT /v1/office/{id}/assign/{user}`
Assigns an office to a given user, or vacates an office. Holder of office can use this to resign.

__Params__

* `{id}` - Required. ID of office to assign.

* `{user}` - Required. ID of user to be assigned, or zero to vacate.

* `token` - Required. Parameter or cookie of user token. Needs `office_assign` role over office.

__Responses__

* __Code__: 200<br>
__Content__: `{ success: true }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'Office not found' }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'User not found' }`

* User is already in this office.<br>
__Code__: 500<br>
__Content__: `{ status: 500, message: 'User already officer' }`

* Office is already vacant.<br>
__Code__: 500<br>
__Content__: `{ status: 500, message: 'Office already vacant' }`


## `POST /v1/office/{id}/assistant`
Creates an assistant office for a given primary one.

__Params__

* `{id}` - Required. ID of parent office.

* `token` - Required. Parameter or cookie of user token. Needs `office_create_assistants` role over office, or `office_create_own_assistants` for self.

__Body__

* `name` - Required. Name of office.

* `email` - The office email.

* `roles` - Array of roles.

__Responses__

* __Code__: 200<br>
__Content__: The modified JSON. See `GET office/{id}`, above.

* No body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'No data provided' }`

* Parent office doesn't exist.<br>
__Code__: 404<br>
__Content__: `{ status: 404, message: 'Parent office not found' }`

* Invalid body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid data provided: [errors]' }`


## `DELETE /v1/office/{id}/assistant`
Deletes an assistant office.

__Params__

* `{id}` - Required. ID of assistant office to delete.

* `token` - Required. Parameter or cookie of user token. Needs `office_create_assistants` role over office, or `office_create_own_assistants` for self.

__Responses__

* __Code__: 200<br>
__Content__: `{ success: true }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'Office not found' }`

* Office is a primary one.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Office is not an assistant' }`

## `GET /v1/office/verify/orgunit/{unit}`
_Internal endpoint only_. Verifies the user has a given role over an org unit.

__Params__

* `{unit}` - Required. ID of org unit to check.

* `roles` - Required. Comma separated list of roles to verify.

* `token` - Required. Parameter or cookie of user token.

__Responses__

* __Code__: 200<br>
__Content__: `{ success: true }`

* __Code__: 400<br>
__Content__: `{ status: 400, message: 'Missing required "roles" param' }`

* All other permission errors.<br>
__Code__: 403<br>
__Content__: `{ status: 403, message: {mixed} }`

## `GET /v1/office/verify/user/{user}`
_Internal endpoint only_. Verifies the user has a given role over a user.

__Params__

* `{user}` - Required. ID of user to check.

* `roles` - Required. Comma separated list of roles to verify.

* `token` - Required. Parameter or cookie of user token.

__Responses__

* __Code__: 200<br>
__Content__: `{ success: true }`

* __Code__: 400<br>
__Content__: `{ status: 400, message: 'Missing required "roles" param' }`

* All other permission errors.<br>
__Code__: 403<br>
__Content__: `{ status: 403, message: {mixed} }`

## `GET /v1/office/verify/office/{office}`
_Internal endpoint only_. Verifies the user has a given role over an office.

__Params__

* `{office}` - Required. ID of office to check.

* `roles` - Required. Comma separated list of roles to verify.

* `token` - Required. Parameter or cookie of user token.

__Responses__

* __Code__: 200<br>
__Content__: `{ success: true }`

* __Code__: 400<br>
__Content__: `{ status: 400, message: 'Missing required "roles" param' }`

* All other permission errors.<br>
__Code__: 403<br>
__Content__: `{ status: 403, message: {mixed} }`
