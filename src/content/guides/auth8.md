---
layout: pages/guide.njk
pageTitle: "Authentification 8.0"
description: Complete guide for OAuth authentication in Uptempo 8.0 using Keycloak-based flows for modern application development
teaserText: "Modern Keycloak-based Authentication & Authorization for accessing the APIs of the Work Modules."
tags: ['guide']
eleventyNavigation:
    parent: "Guides"
    key: "auth"
    title: "Authentication (8.0+)"
    excerpt: "How to authenticate in Uptempo"
    order: 1
permalink: "guides/auth8/"
bodyClass: "guide"
title: "Authentication"
------

# OAuth Authentication Guide for Uptempo 8.0

## Breaking Changes in Version 8.0

> **Important:** The OAuth authentication system has been completely redesigned in Uptempo 8.0. The legacy CAS-based system is no longer valid. You must update your authentication implementation to use the new Keycloak-based OAuth flows.

## Architecture Changes in 8.0

**Key architectural improvements:**

- **Spring-based services** with enhanced authentication logic
- **Keycloak integration** replacing the legacy CAS system  
- **Multi-tenant realm support** for better isolation
- **Enhanced header requirements** for proper user context

## Supported OAuth Flows

### Client Credentials Flow
- **Use case:** System-to-system communication
- **Headers required:** None (system user context)
- **Best for:** API integrations, background services, automated processes

### Authorization Code Flow
- **Use case:** User authentication
- **Headers required:** `X-User-Login` or `X-CurrentUser`
- **Best for:** Web applications, mobile apps, user-facing interfaces

## Prerequisites & Setup

### System Requirements

1. **Authentication Service:** Must be running and properly configured
2. **ETCD Configuration Service:** Contains correct database URLs with credentials
3. **Redis Connection:** For caching and session management
4. **Kafka Messaging:** For user/permissions monitoring and cache updates

### OAuth Client Registration

1. Log in to your **Uptempo 8.0 system as Administrator**
2. Navigate to: `Administration → Fusion → Registered Apps`
3. Click **"Register New App"**
4. Fill in the required information:
   - Application name
   - Redirect URIs (for authorization code flow)
   - Permissions/scopes
5. **Important:** Copy the **Client Secret** immediately, as it is only shown once.

> **Security Note:** Store your Client ID and Client Secret securely. The Client Secret cannot be recovered and you'll need to re-register if it's lost.

## Testing OAuth Flows

### Client Credentials Flow Testing

Use this flow for system-to-system authentication where no user context is required.

#### Request Access Token:

```bash
curl -X POST "https://YOUR_8.0_DOMAIN/access/realms/YOUR_TENANT/protocol/openid-connect/token" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d "client_id=YOUR_CLIENT_ID" \
 -d "client_secret=YOUR_CLIENT_SECRET" \
 -d "grant_type=client_credentials"
```

#### Expected Response:

```json
{
 "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
 "expires_in": 300,
 "refresh_expires_in": 1800,
 "token_type": "Bearer",
 "not-before-policy": 0,
 "scope": "profile email"
}
```

### Authorization Code Flow Testing

Use this flow for user authentication in web applications and mobile apps.

#### Step 1: Get Authorization Code

Direct users to this URL in their browser:

```
https://YOUR_8.0_DOMAIN/access/realms/YOUR_TENANT/protocol/openid-connect/auth?
 client_id=YOUR_CLIENT_ID&
 redirect_uri=YOUR_REDIRECT_URI&
 response_type=code&
 scope=openid profile email&
 state=RANDOM_STRING
```

#### Step 2: Exchange Code for Token

After user consent, exchange the authorization code for tokens:

```bash
curl -X POST "https://YOUR_8.0_DOMAIN/access/realms/YOUR_TENANT/protocol/openid-connect/token" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d "client_id=YOUR_CLIENT_ID" \
 -d "client_secret=YOUR_CLIENT_SECRET" \
 -d "grant_type=authorization_code" \
 -d "code=AUTHORIZATION_CODE" \
 -d "redirect_uri=YOUR_REDIRECT_URI"
```

## API Integration Examples

### Making Authenticated API Calls

When calling Uptempo APIs, you must include the proper headers:

#### For Client Credentials Flow (System Context):

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "X-Tenant-Id: your-tenant-id" \
     "https://YOUR_8.0_DOMAIN/your-service/rest/api/endpoint"
```

#### For Authorization Code Flow (User Context):

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "X-User-Login: username@domain.com" \
     -H "X-CurrentUser: username@domain.com" \
     -H "X-Tenant-Id: your-tenant-id" \
     "https://YOUR_8.0_DOMAIN/your-service/rest/api/endpoint"
```

### Token Refresh

Refresh expired access tokens using the refresh token:

```bash
curl -X POST "https://YOUR_8.0_DOMAIN/access/realms/YOUR_TENANT/protocol/openid-connect/token" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d "client_id=YOUR_CLIENT_ID" \
 -d "client_secret=YOUR_CLIENT_SECRET" \
 -d "grant_type=refresh_token" \
 -d "refresh_token=YOUR_REFRESH_TOKEN"
```

## Common API Endpoints

| Endpoint | Method | Description | Flow |
|----------|--------|-------------|------|
| `/access/realms/{tenant}/protocol/openid-connect/token` | POST | Get access token | Both |
| `/access/realms/{tenant}/protocol/openid-connect/auth` | GET | Authorization endpoint | Authorization Code |
| `/user-service/rest/v1/users` | GET | Get user information | Authorization Code |
| `/spend-service/rest/v1/budgets` | GET | Get budget data | Both |

## Troubleshooting & Debugging

### Check Authentication Service Logs

```bash
kubectl logs -l app=auth-platform -n YOUR_NAMESPACE --since=10m
```

### Verify ETCD Configuration

Ensure database URLs contain proper credentials:
`https://USER:PASS@DBHOST/DBNAME`

### Test Service Routing

Verify all endpoints are accessible and check the `up.auth.sso.custom-integration.root-context` setting

### Validate Token Format

Ensure tokens are valid JWT format and not expired. Check issuer claim matches your tenant realm.

### Common Error Messages

**"Unknown JWT format is provided!"**  
Check that the issuer claim in your token matches your tenant realm URL.

**"failed validating keycloak token, probably not configured"**  
Verify your Keycloak configuration and ensure the auth-platform service can reach the token validation endpoint.

**HTTP 401 Unauthorized**  
Token may be expired or invalid. Try refreshing the token or re-authenticating.

## Testing Tools & Resources

- **[OAuth Debugger](https://oauthdebugger.com/):** An interactive tool to test OAuth flows
- **[Postman](https://www.postman.com/)/[Insomnia](https://insomnia.rest/):** API testing and automation tools
- **Browser Developer Tools:** Useful for debugging the authorization code flow and inspecting network requests
- **[JWT.io](https://jwt.io/):** A resource for decoding and inspecting JWT tokens
- **[curl](https://curl.se/)/[HTTPie](https://httpie.io/):** Command-line tools for making HTTP requests

## Migration Notes from Legacy Versions

**Key differences from pre-8.0 versions:**

- **Base URL change:** `/access/realms/{tenant}/` instead of `/access/`
- **New headers required:** `X-User-Login` or `X-CurrentUser` for user context
- **Keycloak endpoints:** Standard OpenID Connect/OAuth 2.0 endpoints
- **Token format:** Standard JWT tokens instead of proprietary format
- **Tenant isolation:** Separate realms per tenant for better security