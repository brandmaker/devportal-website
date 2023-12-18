---
layout: pages/guide.njk
pageTitle: API Changelog
description: Stay up to date with the latest changes and updates to our REST API
teaserText: "latest changes and updates to our REST API"
tags: ['guide']
eleventyNavigation:
    parent: "API"
    key: "changelog"
    title: "API Changelog"
    excerpt: "latest changes and updates to our REST API"
    order: -1
permalink: "guides/changelog/"
bodyClass: "guide"
title: "API Changelog"
---

<br>
This changelog provides a detailed record of all the changes we've made to our API from the previous version 7.4 to version 7.5, including new features, modifications, and deprecations, so that it can help you adapt your implementations to be compatible with our latest updates.

## Job Manager

The most substantial change in version 7.5 is the introduction of UUIDs (Universally Unique Identifiers) for users, replacing the previous ID system. The old functionality is now deprecated!

> Please note:
>
> In some operations the old IDs have already been replaced by UUIDs, and can no longer be used!

### Breaking
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

### Added
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

### Modified

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