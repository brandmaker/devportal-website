# Devportal-website

Our static web pages that build the environment for the adapted [Swagger UI](https://github.com/brandmaker/swagger-ui). \
This static site generator uses 11ty. 

## Automatic Build
Whenever something is pushed to the master branch (or pull request to master), the _side folder will be generated and pushed to the branch 'published-pages'. This branch is the soucce for GitHub pages (https://developers.brandmaker.com/) \
GitHub will do it automatically with Actions. \


## Quickstart
Clone the repository and run `npm install`

### Static Site Generator
Run `npm run dev`. \
This creates the dist folder (_site) and starts up a hot-reloading local web server. \
If you only want to build "_site" run `npm run build`.

### Adapting Styles
Run `npm run styles`. \
That gives you the contanating of Stylus to our one "main.css" we use for the pages. Change in the folder "style", all files in Stylus Format.

## Organization
*.md files create the pages. 
- index: the main page
- api
- github

Additionally module, productVersion and apiVerion (Swagger files) pages are generated via [pagination](https://www.11ty.dev/docs/pagination/).

### Swagger UI
Our adaption of Swagger UI is located in the folder "swagger". That means all we have to do is to copy the dist-folder from our swagger-ui project to this folder after each build.

### swagger.json files
The swagger.json files should be added into the "api" folder in the following structure: 
- api/module name/
    - product version/
        - api version/
            - \<modulename>-api-\<version>.json

Example: _api/MediaPool/6.8/6.8.1.0/mediapool-api-6.8.1.0.json_ \
It's important, that every api version folder contains only one file.

Every module needs a **module.json** file (api/_\<module name>_/module.json) with a name, which will be displayed in the navigation and as the title. It can also have a variable "info", which contains a tagline displayed in the navigation under the title.
```
{
    "name": "<module name>",
    "info": "<This is a great module>"
}
```

This will generate one page per module, one per product version and one per api version. (with module.md, product.md, swagger.md) \
Thereby the module page will redirect to the last published product version, and the product version page to the last published api version page. If the user already checked out a specific product/api version, he will be redirected to the according page (localStorage)

### FUX Guide
The description of Fusion UX Logic is saved as a Markdown-file just like every other guide. Specific for this guide are the additional descriptions for the PAGE SLOTS. Page slots are defined per module, including the versioning. Therefor they are saved in the same structure as the SWAGGER files and an additional folder with the name of the page slot leading to the following structure:
- api/module name
  - product version/
    - api version/
      - page slot name/
        - `slot.md`
        - `screenshot.png`

Just like with the swagger files, remember to store only one description file and one picture (screenshot of the page slot) in the folder.

The following code shows the template for the `slot.md` file with explanations of what should be documented/specifically described under every subitem
``` md
## Location
- where exactly is the slot located in the UI (also shown with the screenshot)

## UI specifics
- Are there UI specifics to consider when rendering html (width, heights, fonts, colors, events, resize, …)

## Slot attributes
|  | Name        | Purpose       | Type       | Defaults |
|-:|------------|:--------------|:-----------|:---------|
|1 |             |               |            |          |

- which variables are 'exported' to the component
- are the variables watched, i.E. can the component set values which then will be picked up by the caller again?

## Callback functions
|  | Purpose       | Synopsis   | Return values |
|-:|--------------|:-----------|:--------------|
|1 |               |            |               |

- are there callback functions provided

## Error states
- how can error states / messages be provided to the component
- what if component doesn't render anything

## Other specifics or annotations
- any other specific remarks or annotations

```

## Used npm Packages
- eleventy navigation: 
    - https://www.11ty.dev/docs/plugins/navigation/
    - to use in combination with pagination: add `addAllPagesToCollections: true` to pagination description
- fast glob 
    - https://github.com/mrmlnc/fast-glob
    - fetch api folder structure
- gulp:
    - https://gulpjs.com/docs/en/getting-started/quick-start
    - generate main.css out of the style folder
    - including:
        - autoprefixer
        - gulp-plumber
        - gulp-postcss
        - gulp-sourcemaps
        - gulp-stylus
        - gulp-watch

 