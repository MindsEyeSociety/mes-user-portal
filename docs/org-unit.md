# Org Unit
Allows accessing and manipulating organizational units.

## `GET /v1/org-unit`
Provides a list of org units, with optional filtering.

__Params__

* `token` - Required. Parameter or cookie of user token.

* `type` - Type of org unit to show.

* `venue` - Venue type.

* `code` - Search of codes. Cannot be venue `type`.

* `name` - Search of names.

* `limit` - Integer. Number of results to return, defaults to 100.

* `offset` - Integer. Offset for results, defaults to 0.

__Responses__

* __Code__: 200<br>
__Content__: Array of org unit objects.<br>
```
[
	{
		"id": 1,
		"name": "United States",
		"code": "US",
		"type": "Nation"
	}
]
```

* Invalid org unit type specified.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid type specified' }`

* Using non-venue type while specifying venue.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid type with "venue" option' }`

* Specifying a code with a venue type.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Venue type does not have codes' }`

* Other errors.<br>
__Code__: 500<br>
__Content__: `{ status: 400, message: 'Search failed' }`


## `GET /v1/org-unit/{id}`
Provides details about a given org unit.

__Params__

* `{id}` - Required. Can be the numeric ID, the code for non-venues, or "me" for the current user's associated org unit.

* `token` - Required. Parameter or cookie of user token.

__Responses__

* __Code__: 200<br>
__Content__: Details of org unit.<br>
```
{
	"unit":{
		"id":1,
		"name":"United States",
		"code":"US",
		"location":null,
		"website":"http://mindseyesociety.org",
		"type":"Nation",
		"defDoc":null,
		"users":[],
		"offices":[
			{
				"id":1,
				"name":"National Coordinator",
				"type":"Primary",
				"user":{
					"membershipNumber":"US2016010002",
					"firstName":"Test",
					"lastName":"NC",
					"userID":2
				}
			}
		]
	},
	"children":[
		{
			"id":2,
			"name":"North East",
			"code":"NE",
			"type":"Region",
			"children":[
				{
					"id":3,
					"name":"Children of the Lost Eden",
					"code":"NY-004",
					"type":"Domain",
					"children":[]
				}
			]
		},
	],
	"parents":[]
}
```

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'Org unit not found' }`


## `POST /v1/org-unit`
Creates a new org unit, along with the given offices.

__Params__

* `token` - Required. Parameter or cookie of user token. Needs `org_create_{type}` role, with `{type}` being the org unit type being created.

__Body__

* `type`: Required. The type of unit.

* `parentID`: Required. The parent ID of the unit.

* `name`: Required. Unit name.

* `code`: Required except for venue type. The code for the unit.

* `venueType`: Required for venue type. The two-letter code for a given venue.

* `location`: Location of the venue.

* `defDoc`: A definition doc, such as a VSS or domain info.

* `website`: A URL to find the org unit at.

* `id`: The org unit ID. Should not normally be specified.

__Responses__

* __Code__: 200<br>
__Content__: Details of org unit.

* No body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'No data provided' }`

* The parent ID wasn't specified.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'No parent provided' }`

* __Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid org unit type' }`

* __Code__: 400<br>
__Content__: `{ status: 400, message: 'Parent not found' }`

* Parent org unit type wasn't the expected type, such as a venue under a region.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Org type doesn't match expected type' }`

* Invalid body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid data provided: [errors]' }`

* Unknown error.<br>
__Code__: 500<br>
__Content__: `{ status: 500, message: 'There was an error creating the org unit' }`


## `PUT /v1/org-unit/{id}`
Updates an org unit.

__Params__

* `{id}` - Required. Can be the numeric ID, the code for non-venues, or "me" for the current user's associated org unit.

* `token` - Required. Parameter or cookie of user token. Needs `org_update` role over unit.

__Body__

* `name`: Unit name.

* `code`: Ignored for venue type. The code for the unit.

* `location`: Location of the venue.

* `defDoc`: A definition doc, such as a VSS or domain info.

* `website`: A URL to find the org unit at.

__Responses__

* __Code__: 200<br>
__Content__: Updated details of org unit.

* No body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'No data provided' }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'Org unit not found' }`

* Invalid body data provided.<br>
__Code__: 400<br>
__Content__: `{ status: 400, message: 'Invalid data provided: [errors]' }`


## `DELETE /v1/org-unit/{id}`
Deletes an org unit, and associated offices. Users attached to the unit are moved to the parent.

__Params__

* `{id}` - Required. Can be the numeric ID, the code for non-venues, or "me" for the current user's associated org unit.

* `token` - Required. Parameter or cookie of user token. Needs `org_create_{type}` role over the unit, with `{type}` being the org unit type being created.

__Responses__

* __Code__: 200<br>
__Content__: `{ success: true }`

* Deleting the root org isn't allowed.<br>
__Code__: 500<br>
__Content__: `{ status: 400, message: 'Cannot delete root org' }`

* __Code__: 404<br>
__Content__: `{ status: 404, message: 'Org unit not found' }`

* Deleting an org unit with children units is forbidden.<br>
__Code__: 500<br>
__Content__: `{ status: 500, message: 'Cannot delete org with children' }`

* When moving the users, the parent org unit wasn't found.<br>
__Code__: 500<br>
__Content__: `{ status: 500, message: 'No parent found' }`

* Deleting the org unit had a problem.<br>
__Code__: 500<br>
__Content__: `{ status: 500, message: 'Could not delete org' }`
