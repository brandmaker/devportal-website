---
layout: pages/guide.njk
pageTitle: API Changelog
description: Keep up with the latest changes and updates to our REST API.
teaserText: "A detailed record of all the changes we've made to our 8.0 REST API since the previous BrandMaker version"
tags: ['guide']
eleventyNavigation:
    parent: "API"
    key: "changelog"
    title: "API Changelog"
    excerpt: "Latest changes and updates to our REST API"
    order: -1
permalink: "guides/changelog/"
bodyClass: "guide"
title: "API Changelog"
---

<br>
This changelog provides a detailed record of all the changes we've made to our API since the previous version 7.4 to version 8.0, including new features, modifications, and deprecations, so that it can help you adapt your implementations to be compatible with our latest updates.


## Job Manager

### Breaking Changes (Removed Endpoints)

**DELETE**
- **Endpoint:** /dse/rest/v1.0/jobs/{ordinalNumber}/grids/{variableInstanceId}/rows/_delete &nbsp;&nbsp;<font color="#ff003f">Operation is now deleted!</font>

### Note Box

The most substantial change in version 8.0 is the introduction of UUIDs (Universally Unique Identifiers) for users, replacing the previous ID system. The old functionality is now deprecated!

> <font color="#ff003f">Attention!:
>
> In some operations the old IDs have been replaced by UUIDs, and can no longer be used!

### User Identification Changes

Our API has undergone a significant modernization in how we handle user identification. We've moved from numeric IDs to UUIDs across the entire API. This change affects multiple endpoints and DTOs:

#### Updated DTOs
- UserDto now includes UUID field
- AssignmentDto uses UUID for user references
- DseUserGroupDto includes UUID-based identification

#### Migration Notes

If you're currently using numeric user IDs in your Job Manager implementation, you'll need to:

1. Update all user identification references to use UUID format
2. Modify any stored procedures or queries that reference user IDs
3. Update your authentication handling to support UUID-based tokens

We recommend testing these changes thoroughly in a staging environment before deploying to production, as this represents a fundamental change in how user identification is handled throughout the API.

### Security Improvements

The latest version of Job Manager API includes several security enhancements:

1. Enhanced authentication scheme supporting multiple authentication methods
2. More granular security role definitions
3. Improved handling of sensitive data in responses
4. Updated security requirements for participant management endpoints

These changes provide a more robust and secure API while maintaining backward compatibility where possible.

### Added Endpoints

**GET**
- **Endpoint:** /dse/rest/{version}/assets/{assetId}/discussion-count
- **Endpoint:** /dse/rest/{version}/assets/{assetId}/jobs
  - Returns paginated list of jobs containing specific assets
- **Endpoint:** /dse/rest/{version}/assets/{assetId}/products
  - Returns paginated list of products containing specific assets
- **Endpoint:** /dse/rest/v1.0/dse-object/{instanceId}/{l10nLocaleId}/histories
  - Returns detailed history of DSE object changes
- **Endpoint:** /dse/rest/v2/process-types/{technicalName}
  - Enhanced process type retrieval with additional metadata
- **Endpoint:** /dse/rest/v1/dse-object/{instanceId}/{l10nLocaleId}/participants
  - Retrieve list of participants for a job

**PATCH**
- **Endpoint:** /dse/rest/v1/dse-object/{instanceId}/{l10nLocaleId}/participants
  - Add new participants to a job (without replacing existing ones)

**PUT**
- **Endpoint:** /dse/rest/v1/dse-object/{instanceId}/{l10nLocaleId}/participants
  - Add new participants to a job (replacing existing ones)

**DELETE**
- **Endpoint:** /dse/rest/v1/dse-object/{instanceId}/{l10nLocaleId}/participants/{userUUID}
  - Remove a specific participant from a job

### Added Tags

- DseObjectParticipantRestService
- ProcessMetaDataServiceV2
- DseJobDiscussionRestServiceV2

### Changed Endpoints

**GET**
- **Endpoint:** /dse/rest/v1.0/dashboards/my-active
  - **Added Query Parameter:** `sort`
  - **Modified Response:** Enhanced assignment data structure
  - **Response Example:**
    ```json
    {
      "items": [
        {
          "jobInstanceId": 12345,
          "assignment": {
            "assignees": [
              {
                "uuid": "user-uuid",
                "fullName": "User Name"
              }
            ]
          }
        }
      ]
    }
    ```

- **Endpoint:** /dse/rest/v1.0/dse-object/{instanceId}/{l10nLocaleId}
  - **Added Query Parameter:** `includeHistory`
  - **Modified Response:** Updated user identification to UUID format

**POST**
- **Endpoint:** /dse/rest/v1.0/jobs/_search
  - **Added Field:** `userIdUUID`
  - **Deprecated Field:** `userId`
  - **Request Example:**
    ```json
    {
      "userIdUUID": "user-uuid-string",
      "filterId": 12345,
      "states": ["ACTIVE", "PENDING"]
    }
    ```

## Marketing Planner

### Breaking Changes (Deprecated Endpoints)

**POST**
- **Endpoint:** /maps/rest/api/{version}/group &nbsp;&nbsp;<font color="#ff003f">Deprecated API</font>
  - **Added Optional Request Property:** `uid`
  - **Added Response Property:** `uid`

**DELETE**
- **Endpoint:** /maps/rest/api/{version}/group/{id} &nbsp;&nbsp;<font color="#ff003f">Deprecated API</font>

**PUT**
- **Endpoint:** /maps/rest/api/{version}/group/{id} &nbsp;&nbsp;<font color="#ff003f">Deprecated API</font>
  - **Added Optional Request Property:** `uid`

**POST**
- **Endpoint:** /maps/rest/api/{version}/node/{nodeId}/copy/{parentId} &nbsp;&nbsp;<font color="#ff003f">Deprecated API</font>
  - **Added Optional Request Property:** `filteredIds`

**GET**
- **Endpoint:** /maps/rest/api/{version}/usergroups/all &nbsp;&nbsp;<font color="#ff003f">Deprecated API</font>
- **Endpoint:** /maps/rest/api/{version}/usergroups/user/{userId} &nbsp;&nbsp;<font color="#ff003f">Deprecated API</font>

**PUT**
- **Endpoint:** /maps/rest/api/{version}/usergroups/user/{userId} &nbsp;&nbsp;<font color="#ff003f">Deprecated API</font>

**GET**
- **Endpoint:** /maps/rest/api/{version}/node-type/icons/download/{typeId} &nbsp;&nbsp;<font color="#ff003f">Breaking Change</font>
  - **Changed Response Body Type:** From `object` to `string`

### Added Endpoints

**GET**
- **Endpoint:** /maps/rest/api/{version}/dimension/node-allchildren/{nodeId}
  - Retrieves all child nodes for a given dimension node.
- **Endpoint:** /maps/rest/api/{version}/fee
  - **Added Parameter:** `query`
  - **Response Example:**
    ```json
    {
      "fees": [
        {
          "type": "Service",
          "amount": 100
        }
      ]
    }
    ```
- **Endpoint:** /maps/rest/api/{version}/group
  - **Added Property:** `uid`
  - **Response Example:**
    ```json
    {
      "groups": [
        {
          "id": "group-id",
          "uid": "unique-id"
        }
      ]
    }
    ```
- **Endpoint:** /maps/rest/api/{version}/view/lastused/user/{userId}
  - **Added Query Parameter:** `includes`
  - **Added Properties:** `accessType`, `creatorId`
  - **Response Example:**
    ```json
    {
      "views": [
        {
          "id": "view-id",
          "accessType": "Public",
          "creatorId": "user-id"
        }
      ]
    }
    ```
- **Endpoint:** /maps/rest/api/{version}/task/node-allchildren/{nodeId}
  - Retrieves all tasks for a specific node including children.
- **Endpoint:** /maps/rest/api/{version}/node/allchildren/{nodeId}
  - Retrieves all child nodes for a specific node.
- **Endpoint:** /maps/rest/api/{version}/view
  - Create a new view in the system.
- **Endpoint:** /maps/rest/api/{version}/view/all
  - Retrieves all available views.
- **Endpoint:** /maps/rest/api/{version}/view/log/download/{viewId}
  - Downloads the log for a specific view.
- **Endpoint:** /maps/rest/api/{version}/view/{viewId}
  - Retrieves the details of a specific view.
- **Endpoint:** /maps/rest/api/{version}/view/{viewId}
  - Updates details of a specific view.

### Added Tags

- DimensionNodeService
- GroupService
- ViewService

### Changed Endpoints

**PUT**
- **Endpoint:** /maps/rest/api/{version}/dimension/node/{nodeId}
  - Updated to support additional metadata for nodes.

**POST**
- **Endpoint:** /maps/rest/api/{version}/node/{nodeId}/copy/{parentId}
  - **Added Field:** `filteredIds`
  - **Request Example:**
    ```json
    {
      "filteredIds": ["id1", "id2"]
    }
    ```

## Media Pool

### Breaking Changes (Removed Endpoints)

**GET**
- **Endpoint:** /rest/mp/v1.0/archive-entries/asset/{assetId} &nbsp;&nbsp;<font color="#ff003f">Operation is now deprecated!</font>

**Security**
- **Security Scheme:** `"BearerAuth":[]` has been **added** to the root `security` array. &nbsp;&nbsp;<font color="#ff003f">New authentication method!</font>

### Added Endpoints

**GET**
- **Endpoint:** /rest/mp/v1.1/ai-tagging
  - **Description:** Check the progress of the AI tagging service.
  - **Response Example:**
    ```json
    {
        "currentState": "RUNNING",
        "processedItems": 2150,
        "totalItems": 2326
    }
    ```

- **Endpoint:** /rest/mp/v1.1/ai-tagging/asset/{assetId}
  - **Description:** Retrieve AI tagging information for a specific asset.

- **Endpoint:** /rest/mp/v1.1/ai-tagging/configurations
  - **Description:** Retrieve configurations for AI tagging service.

- **Endpoint:** /rest/mp/v1.1/ai-tagging/providers
  - **Description:** Retrieve available AI tagging providers.

- **Endpoint:** /rest/mp/v1.1/ai-tagging/statistics
  - **Description:** Retrieve statistics on AI tagging operations.

**POST**
- **Endpoint:** /rest/mp/v1.1/ai-tagging
  - **Description:** Update the state of the AI tagging service.
  - **Request Example:**
    ```json
    {
        "state": "RUNNING"
    }
    ```
  - **Response Example:**
    ```json
    {
        "currentState": "RUNNING"
    }
    ```

- **Endpoint:** /rest/mp/v1.1/ai-tagging/asset/{assetId}
  - **Description:** Force AI tagging on a single asset's current version.

- **Endpoint:** /rest/mp/v1.1/ai-tagging/configurations/{configurationId}
  - **Description:** Add or update a configuration for AI tagging.

- **Endpoint:** /rest/mp/v1.1/ai-tagging/providers/{providerId}
  - **Description:** Add or update an AI tagging provider.

- **Endpoint:** /rest/mp/v1.1/ai-tagging/statistics/reset
  - **Description:** Reset AI tagging statistics.

**DELETE**
- **Endpoint:** /rest/mp/v1.1/ai-tagging/configurations/{configurationId}
  - **Description:** Remove an AI tagging configuration.

- **Endpoint:** /rest/mp/v1.1/ai-tagging/providers/{providerId}
  - **Description:** Remove an AI tagging provider.

**Added Tags**
- **Tag:** AiAdministrationRestService
- **Tag:** AiTaggingRestServicef
- **Tag:** AiWebTracingRestService

### Changed Endpoints

**GET**
- **Endpoint:** /rest/mp/v1.0/asset-attributes/{id}/nodes
  - **Added Query Parameter:** `filter` for optionally fetching only roots or all nodes.
  - **Added Query Parameter:** `parentId` for fetching first-level children of a node.

**GET**
- **Endpoint:** /rest/mp/v1.0/asset-attributes
  - **Added Query Parameter:** `useLanguageNamesResult`
  - **Description:** Provides enhanced support for internationalization by allowing language-specific results.

**GET**
- **Endpoint:** /rest/mp/v1.1/assets/{assetId}
  - **Added Field:** `assetSets`
  - **Description:** Asset management now supports returning related asset sets in the response.

**GET**
- **Endpoint:** /rest/mp/v1.2/themes
  - **Modified Response:** Restructured for consistency, now returns an array of theme objects.

**POST**
- **Endpoint:** /rest/mp/v1.1/webhooks
  - **Enhanced Filtering:** Webhooks now support filtering by `vdbUuids`.
  - **Request Example:**
    ```json
    {
      "filters": {
        "vdbUuids": ["uuid1", "uuid2"]
      }
    }
    ```

### Breaking Changes

**GET**
- **Endpoint:** /rest/mp/v1.1/virtual-databases/{vdbId}/workflow-steps
  - **Deprecated:** This endpoint will be removed in future releases. Use `/rest/mp/v1.2/virtual-databases/{vdbId}/workflow-steps` instead.

**Response Schema Updates**
- Several endpoints now return UUIDs as primary identifiers. Legacy ID fields are deprecated.
  - **Example:**
    ```json
    {
      "id": 123,
      "uuid": "550e8400-e29b-41d4-a716-446655440000"
    }
    ```

- **Endpoints:** Various endpoints now include more comprehensive error responses with detailed descriptions.

### Security Role Changes

- **Role:** `PIMEDIA_ORGANISATION_MANAGE_MP_SEARCH_CONFIGURATION` now required for AI administration and tagging services.

### Important Changes!

#### Security Scheme Update
The introduction of `"BearerAuth":[]` in the root `security` array means clients must adapt to this new authentication method, potentially breaking existing authentication mechanisms if not handled properly.

#### Documentation Enhancements
- More detailed descriptions have been added to various endpoints, improving API documentation.

#### Endpoint Enhancements
- **Endpoint:** `/rest/mp/v1.1/web-tracing/{assetId}` now includes an example response, making it clearer what kind of data to expect.

## Review Manager

### Breaking Changes

#### API Component Updates
- SecurityRoles type has been modified for the following endpoints:
  - **GET** /rm/rest/v1.0/util/reviews/{id}/_get-general-info &nbsp;&nbsp;<font color="#ff003f">Changed from `REVIEW_MANAGER_MODULE_ACCESS` to `AUTHENTICATED`</font>

#### Schema Changes
- Multiple DTOs have had required fields added or modified:
  - **ReviewParticipantApproval**: Enum values restructured and validation rules updated
  - **ReviewObjectReactUIDto**: Added required `approvedWithChangesEnabled` field
  - **CreateReviewObjectDto**: Added required `flagCreateJmsComment` field
  - **ParticipantExtendedDto**: Added required `extern` field

### New Features

#### Review Management
- Enhanced review object handling with new validation rules
- Improved participant management system with external participant tracking
- Added support for approval with changes functionality in review workflows
- Introduced flagged comment system for review objects

#### Authentication & Security
- Added new authentication scheme options for more flexible security handling
- Extended security role definitions to support granular access control
- Introduced new `AUTHENTICATED` role level for specific endpoints

### Behavioral Changes

#### Review System
- Modified review approval workflow to support multi-state approvals
- Enhanced participant tracking with external participant flags
- Updated review object creation process with additional validation steps

#### Documentation
- Improved endpoint descriptions and examples
- Added more detailed error response documentation
- Enhanced schema descriptions with more precise field definitions

### Technical Improvements

#### Data Models
- Optimized DTO structures for better performance
- Enhanced validation patterns across multiple DTOs
- Improved type safety in response models

#### Response Handling
- Better error handling with more specific error codes
- Enhanced response structure for review-related endpoints
- Improved consistency in response formats


## Brand Template Builder

### Breaking Changes (Updated Endpoints)

**POST**
- **Endpoint:** /wp/rest/attachment/externalIds
  - **Breaking Change:** API path removed without deprecation &nbsp;&nbsp;<font color="#ff003f">Operation is now deleted!</font>

**GET**
- **Endpoint:** /wp/rest/user/write/attachments
  - **Breaking Change:** API path removed without deprecation &nbsp;&nbsp;<font color="#ff003f">Operation is now deleted!</font>

### Added Endpoints

**DELETE**
- **Endpoint:** /wp/rest/dynamic-services/{id}/parameters
  - **Description:** Endpoint added for parameter deletion

**GET**
- **Endpoint:** /wp/rest/templates/{id}/boxes
  - **Breaking Change:** API operation ID changed from `TemplateBoxesResource-GET_get` to `TemplateBoxesResource-GET_getByTemplateId` &nbsp;&nbsp;<font color="#fa8432">Updated!</font>
- **Endpoint:** /wp/rest/templates/{id}/renderers
  - **Description:** Added optional properties `/items/profile`, `/items/resolution`, and `/items/type` to the response for statuses `200`, `403`, and `404`
- **Endpoint:** /wp/rest/templates/{id}/variables
  - **Description:** Endpoint added for variable retrieval

## Shop

### Breaking Changes (Updated Endpoints)

**POST**
- **Endpoint:** /shop/api/rest/v1.0/search/advanced
  - **Breaking Changes:**
    - The response's body type/format changed from `array` to `object` for statuses `200`, `400`, `409`, and `500`
    - Removed request properties:
      - `allOf[subschema #1: AbstractSearchQueryRestDto]/conflictTypes`
      - `allOf[subschema #1: AbstractSearchQueryRestDto]/orderData`
      - `allOf[subschema #1: AbstractSearchQueryRestDto]/text`
      - `conditions`
      - `categoryId`
      - `filters`
      - `headerId`
      - `orderListId`
