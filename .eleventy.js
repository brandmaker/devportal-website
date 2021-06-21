const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const fg = require('fast-glob');
const fs = require('fs');
let Nunjucks = require("nunjucks");
const eleventyPluginTOC = require( '@thedigitalman/eleventy-plugin-toc-a11y' );
const markdownIt = require( 'markdown-it' );
const markdownItAnchor = require( 'markdown-it-anchor' );
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { exit } = require("process");
const pluginDate = require("eleventy-plugin-date");

//const modulesUnstuctured = fg.sync('api/**', { onlyFiles: false, deep: 4, objectMode: true });
const moduleFiles = fg.sync('api/**', { onlyFiles: true, deep: 5, objectMode: true });
const moduleDicts = fg.sync('api/**', { onlyDirectories: true, deep: 5, objectMode: true });


//const name = fg.sync('name.json', {objectMode: true});
module.exports = function (eleventyConfig) {
    
    eleventyConfig.addPlugin(pluginDate);
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("main.css");
    eleventyConfig.addPassthroughCopy("swagger");

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // TOC support in MD

    eleventyConfig.addPlugin( eleventyPluginTOC,
        {
            tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
            wrapper: 'nav',
            wrapperClass: 'toc',
            heading: true,
            headingClass: 'toc__heading',
            headingLevel: 'h2',
            headingText: 'Table of contents',
            listType: 'ol',
            listClass: 'toc__list',
            listItemClass: 'toc__list-item',
            listItemAnchorClass: 'toc__list-item-anchor'
        }
    );

    eleventyConfig.addPlugin(syntaxHighlight);
 
    let options = {
        html: true,
        breaks: true,
        linkify: true
    };

    // Markdown settings
    eleventyConfig.setLibrary( 'md',
        markdownIt(options).use( markdownItAnchor )
    );
    
    /* 
        {moduleName, productVersions: {
            productVersion, apiVersions: {
                apiVersion, pageSlots: {
                    pageSlot
                }
            }
        }}
    */
    var modulesStructured = new Map();
    moduleDicts.forEach(({ name, path }) => {
        const category = path.split("/").length - 1; // if 1: module, if 2: product-version, if 3: api-version

        if (category == 1) {
            modulesStructured.set(name, { moduleName: name, productVersions: new Map() });
            return;
        }

        const moduleName = path.split("/")[1];

        if (category == 2) {
            modulesStructured.get(moduleName).productVersions.set(name, { productVersion: name, apiVersions: new Map() });
            return;
        }

        const productVersion = path.split("/")[2]

        if (category == 3) {
            modulesStructured.get(moduleName).productVersions.get(productVersion).apiVersions.set(name, { apiVersion: name, pageSlots: new Map() });
            return;
        }
    });

    let displayNames = new Map();
    let info = new Map();
    moduleFiles.forEach(({name, path}) => {
        const type = path.split("/").length - 1; // if 2: module.json (display name), if 4: swagger.json, if 5: pageSlot
        const moduleName = path.split("/")[1];
        if ((type == 2) && (displayNames.get(moduleName) == undefined)) {
            var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
            displayNames.set(moduleName, obj.name);
            info.set(moduleName, obj.info);
        }
        
        const productVersion = path.split("/")[2];
        const apiVersion = path.split("/")[3];

        if (type == 4) {
            modulesStructured.get(moduleName).productVersions.get(productVersion).apiVersions.set(apiVersion, { apiVersion: apiVersion, file: name, path: path, pageSlots: new Map() });
            return;
        }

        const slotName = path.split("/")[4];

        if (type == 5) {
            modulesStructured.get(moduleName).productVersions.get(productVersion).apiVersions.get(apiVersion).pageSlots.set(slotName, { pageSlot: slotName, file: name, path: path });
        }
    });

    /*
        structured:
        [moduleName, displayName, lastProductVersion]
    */
    let modulePage = [];
    /*
        structure:
        [moduleName, productVersion, lastApiVersion]
    */
   let productVersionPage = [];
   /*
        structure:
        [moduleName, displayModule, productVersion, apiVersion, file]
    */
    let apiVersionPage = [];
    /*
        strucutre:
        [moduleName, displayModule, productVersion, apiVersion, pageSlotName, file]
    */
    let pageSlotPage = [];
    // module, productversion and apiversions as lists as well only containing instances that have pageslot defition underneath them
    let pageSlotModulePage = [];
    let pageSlotProductVersionPage = [];
    let pageSlotApiVersionPage = [];


    modulesStructured.forEach(({ moduleName, productVersions }) => {
        var lastProductVersion;
        var productVersionJson = "{ \"productVersions\": [";
        var lastProductVersionWithPageSlot;
        var lastApiVersions = new Map();
        var lastApiVersionWithPageSlot = new Map();
        var lastPageSlots = new Map();
        productVersions.forEach(({ productVersion, apiVersions }) => {
            var lastApiVersion;
            var apiVersionJson = "{ \"apiVersions\": [";
            productVersionJson = productVersionJson + "\"" + productVersion + "\",";
            if (lastProductVersion == null) {
                lastProductVersion = productVersion;
            } else {
                if ((parseInt(productVersion[0]) > parseInt(lastProductVersion[0])) ||
                    ((parseInt(productVersion[0]) == parseInt(lastProductVersion[0])) && (parseInt(productVersion[2]) > parseInt(lastProductVersion[2])))) {
                    lastProductVersion = productVersion;
                }
            }
            lastPageSlots.set(productVersion, { apiVersion: new Map() });
            apiVersions.forEach(({ apiVersion, file, pageSlots }) => {
                apiVersionJson = apiVersionJson + "\"" + apiVersion + "\",";
                if (lastApiVersion == null) {
                    lastApiVersion = apiVersion;
                    lastApiVersions.set(productVersion, apiVersion)
                } else {
                    if ((parseInt(apiVersion[4]) > parseInt(lastApiVersion[4])) ||
                        ((parseInt(apiVersion[4]) == parseInt(lastApiVersion[4])) && (parseInt(apiVersion[6]) > parseInt(lastApiVersion[6])))) {
                        lastApiVersion = apiVersion;
                        lastApiVersions.set(productVersion, apiVersion);
                    }
                }
                pageSlots.forEach(({ pageSlot }) => {
                    lastProductVersionWithPageSlot = productVersion;
                    lastApiVersionWithPageSlot.set(productVersion, apiVersion);
                    lastPageSlots.get(productVersion).apiVersion.set(apiVersion, pageSlot);
                });
                apiVersionPage.push([moduleName, displayNames.get(moduleName), productVersion, apiVersion, file]);
            });
            if (lastApiVersion == null) {
                console.log("Error with API version");
                exit(1);
            }
            productVersionPage.push([moduleName, productVersion, lastApiVersion]);
            lastApiVersion = null;
            apiVersionJson = apiVersionJson.slice(0, -1);
            apiVersionJson = apiVersionJson + "]}";
            fs.writeFile("api/" + moduleName + "/" + productVersion + "/apiVersions.json", apiVersionJson, function(err, result) {
                if(err) console.log('error', err);
            });
        });
        if (lastProductVersion == null) {
            console.log("Error with product version");
            exit(1);
        }
        productVersionJson = productVersionJson.slice(0, -1);
        productVersionJson = productVersionJson + "]}";
        fs.writeFile("api/" + moduleName + "/productVersions.json", productVersionJson, function(err, result) {
            if(err) console.log('error', err);
        });
        modulePage.push([moduleName, displayNames.get(moduleName), lastProductVersion, info.get(moduleName) || ""]);
        var addModule = false;
        productVersions.forEach(({ productVersion, apiVersions }) => {
            var addProductVersion = false;
            apiVersions.forEach(({ apiVersion, pageSlots }) => {
                var addApiVersion = false;
                pageSlots.forEach(({ pageSlot, file }) => {
                    addApiVersion = true;
                    addProductVersion = true;
                    addModule = true;
                    pageSlotPage.push([moduleName, displayNames.get(moduleName), productVersion, apiVersion, pageSlot, file]);
                });
                if (addApiVersion) {
                    pageSlotApiVersionPage.push([moduleName, productVersion, apiVersion, lastPageSlots.get(productVersion).apiVersion.get(apiVersion)]);
                }
            });
            if (addProductVersion) {
                pageSlotProductVersionPage.push([moduleName, productVersion, lastApiVersionWithPageSlot.get(productVersion)]);
            }
        });
        if (addModule) {
            pageSlotModulePage.push([moduleName, displayNames.get(moduleName), lastProductVersionWithPageSlot]);
        }
    });

    eleventyConfig.addCollection('modules', function (collection) {
        return modulePage;
    });
    eleventyConfig.addCollection('productVersions', function (collection) {
        return productVersionPage;
    });
    eleventyConfig.addCollection('apiVersions', function (collection) {
        return apiVersionPage;
    });
    eleventyConfig.addCollection('pageSlots', function (collection) {
        return pageSlotPage;
    });
    eleventyConfig.addCollection('pageSlotModules', function (collection) {
        return pageSlotModulePage;
    });
    eleventyConfig.addCollection('pageSlotProductVersions', function (collection) {
        return pageSlotProductVersionPage;
    });
    eleventyConfig.addCollection('pageSlotApiVersions', function (collection) {
        return pageSlotApiVersionPage;
    });

    
    eleventyConfig.addPassthroughCopy("api");



    let nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("_includes")
    );
    eleventyConfig.setLibrary("njk", nunjucksEnvironment);
    
}