---
layout: pages/fuxGuide.njk
pageTitle: Fusion UX Logic Guide
description: Build in custom components into your system.
teaserText: "With Fusion UX Logic, clients can now integrate custom UI component into predefined places in their BrandMaker system"
tags: ['guide']
eleventyNavigation:
    parent: "Guides"
    key: "FUX"
    title: "Fusion UX Logic Guide"
    excerpt: "Build in custom components into your system"
    order: -1
permalink: "guides/fusion-ux-logic/index.html"
bodyClass: "guide"
title: "Fusion UX Logic Guide"
---

With Fusion UX Logic, clients can now integrate **custom UI components** into [**predefined places**](#page-slots) in their BrandMaker system. 
Possible functionalities that can easily be implemented with custom components are:
- pulling additional information from 3rd party applications and displaying them
  - showing that Fusion UX Apps can execute lookups e.g. in external databases
- intergrating a Lickert Scale, or other evaluation questionnaires
  - showing that Fusion UX Apps can write back results
- visualize existing information in customized component
  - as charts etc.


[Web Components](#web-component-basics) serve as the technical foundation. Besides the initial component, a Fusion UX App also consists of a set of configuration values collected in a [Manifest file](#manifest-file). \
In the [administration](#structure-of-the-administration) of the BrandMaker system, Fusion UX Apps are both registered and managed.

## Structure of the administration
Within the administration module, custom components are managed under 'Fusion/UX Logic'. There they can be registered, installed, and adapted. 

![](/assets/guides/fusion-ux-logic/navigation.png)

### (1) Component Administration
The **scripts** for the Fusion UX Apps are managed in the section 'Component Administration', meaning new component scripts can be registered and already existing ones can be altered.

 ![](/assets/guides/fusion-ux-logic/admin_overview.png)

(a): To register a new Fusion UX App, click on 'Create new component'. In the opened dialog, upload the corresponding [ZIP file](#structure-of-zip-file) containing the source files. \
The component is now checked by the BrandMaker system. If the validation passes, the system generates a unique ID and a URL, under which the component will be available. The Fusion UX App can now be integrated into the system.

![](/assets/guides/fusion-ux-logic/admin_upload_new_component.png)

(b): To adjust a script, click on the corresponding table entry. The opened page shows the metadata and attributes of the component. The page only *displays* these values. To *adjust* them, alter the source files and re-upload them. If the component is used inside the system (see Component Usage), make sure the attributes still work with the defined usages or adjust the usage accordingly.

![](/assets/guides/fusion-ux-logic/admin_adjust_component.png)

### (2) Component Usage
In this section, the actual 'Component Usage', meaning the integration into the BrandMaker system, is defined and managed. The usage definition includes where (**placement**) and how (**configuration**) the component will be rendered. \
The placement is defined by a module, a page, and a predefined spot within the module. Important to notice, a slot can only have one associated usage at a time.

![](/assets/guides/fusion-ux-logic/usage_overview.png)

(a): To add a new placement-configuration combination, click on 'Create new Usage'. In the opened dialog, choose a registered component (can be both predefined by BrandMaker or own custom component) and select the module, page, and one of the predefined spots, in which the Fusion UX App will be displayed. \
Configure the attributes of the chosen component by setting a default value and/or assigning them to slot attributes of the selected slot. These attributes are resolved as follows:
1. Take value from the assigned slot attribute
   - the slot attributes are specified per page slot <span style="color:red">*(see [Page Slot Definition](todo: link))*</span>
2. Use default value
3. If not required: `null` 

![](/assets/guides/fusion-ux-logic/usage_create_new_usage.png)

(b) To configure a usage, select it in the table. This will open the same dialog shown under (a).

## Development of own custom component


### Web Component Basics

The components use [Web Components](https://www.webcomponents.org/introduction) as a technical foundation. \
A minimal component, only displaying `HELLO WORLD!`, would look like this:
```javascript
// template for the custom component
const template = document.createElement('template');
template.innerHTML = `<h1>HELLO WORLD!</h1>`;

export default class HelloWorldComponent extends HTMLElement {
    constructor() {
        super();

        // need to attach a shadow DOM (will return the ShadowRoot)
        this._root = this.attachShadow({ mode: "closed" });
        this._root.appendChild(template.content.cloneNode(true));
    }
}
```

<span style="color:gray">*To formalize the setup, [hybrids](https://hybrids.js.org/#/) can be used as an abstraction layer.*</span>


### Specifics for BrandMaker

Components will not be completely static. Instead, they will have a set of configuration values, e.g. target URLs of REST API to fetch data that will be displayed, credentials to log in, UI settings like colors, images, etc.\
Instead of hard-coding the settings into the component, they will be described in a Manifest file and can be edited in the administration.


#### Structure of ZIP file
A Fusion UX App consists of:
- the initial Web Component (needs to be called '`BmFusionAppComponent.js`')
  - entry point for rendering the Fusion UX App
- a Manifest file (needs to be called '`manifest.json`')
- any additional JS files required from the component
  - additional libraries are NOT allowed (license obligations / conflict with Page libraries and/or versions)

These constituents are bundled into one ZIP file (flat list of files, o nesting) and uploaded at once when registering a new component.\
<span style="color:gray">*To create the ZIP file, use a framework like [Webpack](#https://webpack.js.org/), which compresses the constituents into one single file.*</span>


#### Manifest file

This JSON file contains metadata and the description of the Fusion UX App, which also includes the description of the setting properties (NOT the settings themselves). In more detail, the Manifest file looks like this:
- name of the component
- description of component (e.g. what does it display and why, where to use it)
- tag name (HTML tag, has to start with '`fux-`')
- author, license, version
- description of attributes (stored as JSON array, will be given to the component as HTML attributes):
    - name (has to start with '`fux-`')
    - type, can be one of the following
      - STRING, NUMBER, FUNCTION, URL
      - component-code-base-url (to draw information from / use the specified component)
      - external-service-base-url (to fetch information from external source)
      - or sub-values
    - description
    - required

Once the component is successfully registered, it will also have a unique ID as part of its metadata. \
The name as well as the tag name need to be unique within your system. Also, Fusion UX Apps need at least one attribute.

#### Page Slots
As mentioned before, Fusion UX Apps can be integrated into predefined places called Page Slots. They are defined by
- ID and name
- Page (defined by Id, name and module)
- Collection of Slot Attributes, each one defined by
  - ID, name and description
  - type (STRING, NUMBER, FUNCTION or URL)


By creating a Usage, a page slot configuration will be created, which assigns the page slot to a component and captures the relations for the component attributes.

An examplary mapping of the component attributes might look like this:
![](/assets/guides/fusion-ux-logic/mapping_attributes.png)
The values are actually assigned, when the component is rendered.



### Example Implementation of 'Hello World App'
This example app will be integrated into the system in the timeline slot (in MAPL calendar). Rendered, it will look like this:
![](/assets/guides/fusion-ux-logic/hello_world_result.png)

The component displays two attributes:
- title (greeting and name)
- number (increasable via a counter, by clicking on it)


#### Code for the component (Javascript)
```javascript
'use strict';

const template = document.createElement('template');
template.innerHTML = `
<style type="text/css">
    <!-- css style -->
</style>
<div class="hello-world-wrapper">
    <h1 class="fux__title"></h1>
    <div class="attribute_wrapper">
        <h1 class="attribute_name">
            counter:
        </h1>
        <button class="attribute_value fux__counter"></button>
    </div>
</div>
`;

export default class HelloWorldComponent extends HTMLElement {
    constructor() {
        super();

        this._root = this.attachShadow({ mode: "closed" });
        this._root.appendChild(template.content.cloneNode(true));
        this.increaseCount = this.increaseCount.bind(this);
    }
    
    connectedCallback() {
        // fetch the attributes defined in the manifest file
        this.number = parseInt(this.getAttribute('fux-start-number')) || 0;
        this.title = 'Hello ' + (this.getAttribute('fux-name') || 'Fusion UX Logic') + '!';

        this._root.querySelector('.fux__counter').addEventListener('click', this.increaseCount)

        this.renderData();
    }

    renderData() {
        const main = this._root.querySelector('.hello-world-wrapper');
        main.style.display = 'block';

        // include the attributes into the template
        this._root.querySelector('.fux__title').innerHTML = `${this.title}`;
        this._root.querySelector('.fux__counter').innerHTML = `${this.number}`;
    }

    increaseCount() {
        this.number += 1;
        this._root.querySelector('.fux__counter').innerHTML = `${this.number}`;
    }


}


```

#### Manifest file
```json
{
    "name": "Hello World component",
    "version": "1.0",
    "author": "Meret Unbehaun",
    "description": "Simple hello world component",
    "tagName": "fux-hello-world",
    "license": "BRANDMAKER",
    "attributes": [
        {
            "name": "fux-start-number",
            "type": "NUMBER",
            "description": "Initial number of the counter",
            "required": true
        }, {
            "name": "fux-name",
            "type": "STRING",
            "description": "Name that will be displayed after 'Hello', by default: Fusion UX Logic",
            "required": false
        }
    ]
}
```


#### Installation and Integration
After registering the bundled App like shown under [Component Administration](#(1)-component-administration), the detail page should look like this:

![](/assets/guides/fusion-ux-logic/hello_world_detail_page.png)

The slot, in which the component will be rendered, is the content enrichment timeline node in MAPL. To display the component there, a new 'Component Usage' will be defined. \
The filled-out Usage form for the Hello World component will look like this:

![](/assets/guides/fusion-ux-logic/hello_world_usage_form.png)

Some notes about the attributes and their assignments:
- the default value will be used, if no other value is available
- `fux-name` only has the default value
    - therefore, the attribute will always have this value
    - because the attribute is not required, it would also be valid to leave this field empty
- the timeline slot provides two arguments itself:
    - `timelineId` and `nodeId`
    - both are of the type NUMBER and thus can only be assigned to a NUMBER attribute
    - in this example, it can be assigned to `fux-start-number`


The code for the rendered component (inside MAPL) will look like this:
```html
<!-- the placeholder (predefined spot) -->
<div id="timeline_popover_component_holder" class="timeline_popover-cmp">
    
    <!-- the rendered component (fetched from automatically assigned URL) with the assigned arguments -->
    <fux-hello-world 
        fux-component-code-base-url="/rest/frontend/web-components/e1de71da-66e2-4ef5-aabc-ddcb79cf0dd9/_download-file"
        fux-name="World" 
        fux-start-number="8693"
    >
        <!-- the root for the shadow DOM -->
        #shadow-root (closed)

            <!-- style and html structure from inner html --> 
            <style type="text/css"> <!-- ... --> </style>
            <div class="hello-world-wrapper" style="display: block;"> <!-- ... --> </div>

    </fux-hello-world>
</div>
```