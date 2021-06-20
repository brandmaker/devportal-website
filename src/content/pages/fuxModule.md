---
layout: pages/fuxModule.njk
pageTitle: Brandmaker Dev Portal
pagination:
    data: collections.pageSlotModules
    size: 1
    alias: module
    addAllPagesToCollections: true
permalink: "guides/fusion-ux-logic/{{ module[0] }}/index.html"
eleventyComputed:
    eleventyNavigation:
        parent: FUX
        key: "FUX/{{ module[0] }}"
        title: "{{ module[1] }}"
        url: "{{ module[0] }}"
        excerpt: "{{ module[2] }}"
    destination: "{{ module[2] }}"
    title: "{{ module[1] }}"
---