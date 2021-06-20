---
layout: pages/fuxProductVersion.njk
pageTitle: Brandmaker Dev Portal
pagination:
    data: collections.pageSlotProductVersions
    size: 1
    alias: productVersion
    addAllPagesToCollections: true
permalink: "guides/fusion-ux-logic/{{ productVersion[0] }}/{{ productVersion[1] }}/index.html"
eleventyComputed:
    eleventyNavigation:
        parent: "FUX/{{ productVersion[0] }}"
        key: "FUX/{{ productVersion[0] }}/{{ productVersion[1] }}"
        title: "{{ productVersion[1] }}"
        url: "{{ productVersion[1] }}"
        excerpt: "{{ productVersion[2] }}"
    destination: "{{ productVersion[2] }}"
---