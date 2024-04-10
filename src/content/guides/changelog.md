---
layout: pages/guide.njk
pageTitle: API Changelog
description: Stay up to date with the latest changes and updates to our REST API
teaserText: "A detailed record of all the changes we've made to our REST API since the previous version"
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
This changelog provides a detailed record of all the changes we've made to our API since the previous version 7.4 to version 7.5, including new features, modifications, and deprecations, so that it can help you adapt your implementations to be compatible with our latest updates.

## Job Manager

The most substantial change in version 7.5 is the introduction of UUIDs (Universally Unique Identifiers) for users, replacing the previous ID system. The old functionality is now deprecated!

> Please note:
>
> In some operations the old IDs have already been replaced by UUIDs, and can no longer be used!

### Breaking (3)
Removing a resource is always breaking unless it was deprecated before.

**GET** &nbsp;/dse/rest/v1.0/dse-object/{instanceId}/{l10nLocaleId}

> Response
>
>> creator &rarr; id &nbsp;&nbsp;<font color="#ff003f">_removed_</font>
>> creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#ff003f">_removed_</font>
>> assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp;/dse/rest/v1.0/jobs/discussions/{discussionId}/comments

> Response
>
>> user &rarr; id &nbsp;&nbsp;<font color="#ff003f">_removed_</font>
>> user &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

 **GET** &nbsp;/dse/rest/v1.0/jobs/{ordinalNumber}

> Response
>
>> creator &rarr; id &nbsp;&nbsp;<font color="#ff003f">_removed_</font>
>> creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#ff003f">_removed_</font>
>> assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

### Added Endpoints (9)
Newly added operations now available in Job Manager with version 7.5:

- **GET** &nbsp; /dse/rest/v1.0/dse-object/{instanceId}/{l10nLocaleId}/histories
- **GET** &nbsp; /dse/rest/v1.0/job-manager/filters
- **GET** &nbsp; /dse/rest/v2/process-types/{technicalName}
- **GET** &nbsp; /dse/rest/{version}/assets/{assetId}/discussion-count
- **PATCH** &nbsp; /dse/rest/v1.0/dse-object/{instanceId}
- **POST** &nbsp; /dse/rest/v1.0/dse-object
- **POST** &nbsp; /dse/rest/v1.0/job-manager/types/_search-by-filter
- **POST** &nbsp; /dse/rest/v2.0/jobs/discussions/{discussionId}/participants/_add
- **POST** &nbsp; /dse/rest/v2.0/jobs/discussions/{discussionId}/participants/_delete

### Modified (30)

**GET** &nbsp; /dse/rest/v1.0/job-manager/types

> Response
>
>> variables &rarr; label &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> variables &rarr; help &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> color &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1.0/jobs/filters/{filterId}/types &nbsp;&nbsp;<font color="#fa8432">Operation is now deprecated!</font>

> Response
>
>> types &rarr; variables &rarr; label &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> types &rarr; variables &rarr; help &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> types &rarr; color &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1.0/jobs/{ordinalNumber}/subjobs

> Response
>
>> items &rarr; values &rarr; creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> items &rarr; values &rarr; creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> items &rarr; assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> items &rarr; assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> items &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> items &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1.0/product-manager/types

> Response
>
>> variables &rarr; label &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> variables &rarr; help &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> color &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1.0/product-manager/types-light

> Response
>
>> variables &rarr; label &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> variables &rarr; help &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1.0/products/{ordinalNumber}/{localeId}

> Response
>
>> creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1.0/products/{ordinalNumber}/{localeId}/subproducts

> Response
>
>> items &rarr; creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> items &rarr; creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1/job-or-process/{jobOrProcessId}

> Response
>
>> creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1/process-list/{nextChunkId}

> Response
>
>> values &rarr; creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; workflowStep &rarr; assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; workflowStep &rarr; assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; workflowStep &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; workflowStep &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1/process-types

> Response
>
>> variables &rarr; label &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> variables &rarr; help &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> color &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1/process-types/{dseObjectTypeId}

> Response
>
>> variables &rarr; label &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> variables &rarr; help &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> color &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /dse/rest/v1/process/{processId}

> Response
>
>> creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/job-manager/types/_search

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/jobs

> Body
>
>> creatorId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> creatorUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/jobs/_search

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> values &rarr; creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/jobs/_search/ids

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/jobs/discussions/{discussionId}/comments

> Response
>
>> id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/jobs/{ordinalNumber}/_assign

> Body
>
>> assigneeId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userGroupId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assigneeUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> userGroupUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/jobs/{ordinalNumber}/_forward

> Body
>
>> assigneeId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userGroupId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assigneeUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> userGroupUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/jobs/{ordinalNumber}/_reject

> Body
>
>> assigneeId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userGroupId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assigneeUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> userGroupUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/product-manager/types/_search

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>

**POST** &nbsp; /dse/rest/v1.0/products

> Body
>
>> creatorId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> creatorUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/products/_search &nbsp;&nbsp;<font color="#fa8432">Operation is now deprecated!</font>

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> values &rarr; creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1.0/products/_search/ids &nbsp;&nbsp;<font color="#fa8432">Operation is now deprecated!</font>

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1/job-or-process/{jobOrProcessId}/_approve

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1/process-list

> Response
>
>> values &rarr; creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; workflowStep &rarr; assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; workflowStep &rarr; assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; workflowStep &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; workflowStep &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1/process-types/{processTypeId}/process

> Body
>
>> alActivityId &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> creatorUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> 201 response &nbsp;&nbsp;<font color="#ff003f">_removed_</font>
>> 202 response &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1/product-list

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> values &rarr; creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> values &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> values &rarr; assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /dse/rest/v1/product-list/ids

> Body
>
>> userId &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> userIdUUID &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**PUT** &nbsp; /dse/rest/v1.0/jobs/{ordinalNumber}

> Response
>
>> creator &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> creator &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; assignees &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; assignees &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; id &nbsp;&nbsp;<font color="#fa8432">_deprecated_</font>
>> assignment &rarr; group &rarr; defaultAssignee &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

## Media Pool

### Breaking (2)
Removing a resource is always breaking unless it was deprecated before.

**GET** &nbsp; /rest/mp/v1.0/settings &nbsp;&nbsp;<font color="#ff003f">Operation is now deleted!</font>

**GET** &nbsp; /rest/mp/v1.0/suggest

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> response: 200 &nbsp;&nbsp;<font color="#ff003f">_deleted_</font>
>> response: 204 &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

### Added Endpoints (24)
Newly added operations now available in Media Pool with version 7.5:

- **POST** &nbsp; /rest/mp/v1.0/assets/_delete
- **GET** &nbsp; /rest/mp/v1.0/assets/digital-watermark/{sessionId}
- **GET** &nbsp; /rest/mp/v1.0/assets/import/mass-imports
- **GET** &nbsp; /rest/mp/v1.0/assets/import/mass-imports/assets
- **DELETE** &nbsp; /rest/mp/v1.0/assets/import/mass-imports/{massImportId}
- **GET** &nbsp; /rest/mp/v1.0/assets/import/mass-imports/{massImportId}
- **PUT** &nbsp; /rest/mp/v1.0/assets/import/mass-imports/{massImportId}
- **GET** &nbsp; /rest/mp/v1.0/assets/import/mass-imports/{massImportId}/assets
- **POST** &nbsp; /rest/mp/v1.0/assets/import/mass-imports/{massImportId}/assets
- **POST** &nbsp; /rest/mp/v1.0/assets/import/mass-imports/{massImportId}/matches
- **POST** &nbsp; /rest/mp/v1.0/assets/{assetId}/_extract
- **GET** &nbsp; /rest/mp/v1.0/fonts
- **GET** &nbsp; /rest/mp/v1.0/fonts/valid
- **POST** &nbsp; /rest/mp/v1.0/fonts/valid
- **POST** &nbsp; /rest/mp/v1.0/versions/assets/_merge
- **DELETE** &nbsp; /rest/mp/v1.1/assets/{assetId}/subscribers
- **GET** &nbsp; /rest/mp/v1.1/assets/{assetId}/subscribers
- **POST** &nbsp; /rest/mp/v1.1/licenses/requests
- **GET** &nbsp; /rest/mp/v1.1/search/config
- **POST** &nbsp; /rest/mp/v1.1/search/config
- **GET** &nbsp; /rest/mp/v1.1/users/{userId}/activity
- **POST** &nbsp; /rest/mp/v1.1/users/{userId}/assets
- **GET** &nbsp; /rest/mp/v1.1/users/{userUuid}/activity
- **POST** &nbsp; /rest/mp/v1.1/users/{userUuid}/assets

### Modified (45)

**GET** &nbsp; /rest/mp/v1.0/asset-attributes

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /rest/mp/v1.0/asset-attributes

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/asset-attributes/{id}

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/asset-attributes/{id}/nodes

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**PATCH** &nbsp; /rest/mp/v1.0/asset-attributes/{id}/nodes

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/asset-attributes/{id}/trees

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/asset-types

> Request Body
>
>> assetTypes &rarr; orgUnitUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assetTypes &rarr; roleUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assetTypes &rarr; useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> assetTypes &rarr; orgUnitUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> assetTypes &rarr; roleUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /rest/mp/v1.0/asset-types

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> orgUnitUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> roleUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/asset-types/{id}

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> orgUnitUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> roleUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**PUT** &nbsp; /rest/mp/v1.0/asset-types/{id}

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> orgUnitUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> roleUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/asset-types/{id}/attribute-configs

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/asset-types/{id}/groups

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**PATCH** &nbsp; /rest/mp/v1.0/asset-types/{id}/groups

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /rest/mp/v1.0/assets/import/mass-imports

> Response
>
>> lastUploadDate &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> ownerName &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> ownerUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /rest/mp/v1.0/assets/load

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/assets/{assetId}/edit-schema

> Response
>
>> selectedApproverUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/assets/{assetId}/versions/latest

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/assets/{assetId}/versions/official

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/assets/{assetId}/versions/upload-schema

> Response
>
>> selectedApproverUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/assets/{assetId}/versions/{resourceVersion}

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/assets/{assetId}/workflow-steps

> Response
>
>> uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/previews/{previewType}/asset/{assetId}

> Request Body
>
>> contentDisposition &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/search/aggregation

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.0/settings/{name}

> Response
>
>> response: 401 &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /rest/mp/v1.0/versions/assets/{assetId}

> Response
>
>> userUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.1/assets/{assetId}/versions/latest

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> assetSets &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.1/assets/{assetId}/versions/{resourceVersion}

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> assetSets &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.1/free-fields

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.1/keywords

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.1/organizational-units

> Request Body
>
>> uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**OPTIONS** &nbsp; /rest/mp/v1.1/search

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /rest/mp/v1.1/search

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> orgUnitUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> ownerUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.1/search/languages/default

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> orgUnitUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> ownerUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.1/users

> Response
>
>> uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.1/users/current/asset-collections

> Response
>
>> lastUploadDate &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> ownerName &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> ownerUuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>

**GET** &nbsp; /rest/mp/v1.1/virtual-databases/{vdbId}/workflow-steps &nbsp;&nbsp;<font color="#fa8432">Operation is now deprecated!</font>

> Response
>
>> steps &rarr; approvers &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> steps &rarr; divisions &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> steps &rarr; divisions &rarr; approvers &rarr; uuid &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**PATCH** &nbsp; /rest/mp/v1.2/assets

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.2/keywords

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /rest/mp/v1.2/keywords

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.2/themes

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

> Response
>
>> response: 401 &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>> name &nbsp;&nbsp;<font color="#ff003f">_changed data type_</font>
>

**POST** &nbsp; /rest/mp/v1.2/themes

> Request Body
>
>> useLanguageNamesResult &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.2/webhooks

> Response
>
>> vdbUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**POST** &nbsp; /rest/mp/v1.2/webhooks

> Response
>
>> vdbUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**PUT** &nbsp; /rest/mp/v1.2/webhooks

> Response
>
>> vdbUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>

**GET** &nbsp; /rest/mp/v1.2/webhooks/{id}

> Response
>
>> vdbUuids &nbsp;&nbsp;<font color="#5edc1f">_added_</font>
>