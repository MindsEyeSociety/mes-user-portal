# Endpoint Details

* [Authentication](auth.md)
* [User](user.md)
* [Office](office.md)
* [Org Unit](org-unit.md)

# All Endpoints
The following information applies to most or all endpoints:

## Tokens
Most endpoints require a token, provided by the `auth` endpoint. This should be stored and passed in the query string or in the cookie with a key of `token`.

Successful queries with a valid token refreshes it for an additional hour on all endpoints that require the token.

Errors with tokens are as follows:

* Token not provided.<br>
  __Code__: 403<br>
  __Content__: `{ status: 403, message: 'Token not provided' }`

* Invalid token.<br>
  __Code__: 403<br>
  __Content__: `{ status: 403, message: 'Invalid token' }`

* Member is expired and attempting to act as an officer.<br>
  __Code__: 403<br>
  __Content__: `{ status: 403, message: 'User is expired' }`

* Member is suspended and attempting to act as an officer.<br>
  __Code__: 403<br>
  __Content__: `{ status: 403, message: 'User is suspended' }`

* Attempted to check user expiration but no user data found.<br>
  __Code__: 500<br>
  __Content__: `{ status: 500, message: 'User is not loaded' }`

## Permissions
Some endpoints, mostly write ones, require the user associated with a given `token` to have a given role.

Errors with permission errors are as follows:

* User has no offices<br>
  __Code__: 403<br>
  __Content__: `{ status: 403, message: 'User has no offices' }`

* User has offices, but none with the right role<br>
__Code__: 403<br>
__Content__: `{ status: 403, message: 'No offices with permission' }`

* No valid offices found<br>
  __Code__: 403<br>
  __Content__: `{ status: 403, message: 'Officer not found in chain' }`

__Note__: Users with the `admin` role pass _all_ permission checks.
