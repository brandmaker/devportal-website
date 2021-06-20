---
layout: pages/fuxApiVersion.njk
pageTitle: Brandmaker Dev Portal
pagination:
    data: collections.pageSlotApiVersions
    size: 1
    alias: apiVersion
    addAllPagesToCollections: true
permalink: "guides/fusion-ux-logic/{{ apiVersion[0] }}/{{ apiVersion[1] }}/{{ apiVersion[2] }}/index.html"
eleventyComputed:
    eleventyNavigation:
        parent: "FUX/{{ apiVersion[0] }}/{{ apiVersion[1] }}"
        key: "FUX/{{ apiVersion[0] }}/{{ apiVersion[1] }}/{{ apiVersion[2] }}"
        title: "{{ apiVersion[2] }}"
        url: "{{ apiVersion[2] }}"
        exceprt: "{{ apiVersion[3] }}"
    destination: "{{ apiVersion[3] }}"
---