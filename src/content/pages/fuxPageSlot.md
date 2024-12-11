---
layout: pages/fuxPageSlots.njk
pageTitle: Uptempo Dev Portal
pagination:
    data: collections.pageSlots
    size: 1
    alias: pageSlots
    addAllPagesToCollections: true
permalink: "guides/fusion-ux-logic/{{ pageSlots[0] }}/{{ pageSlots[2] }}/{{ pageSlots[3] }}/{{ pageSlots[4] }}/index.html"
eleventyComputed:
    eleventyNavigation:
        parent: "FUX/{{ pageSlots[0] }}/{{ pageSlots[2] }}/{{ pageSlots[3] }}"
        key: "{{ pageSlots[0] }}/{{ pageSlots[2] }}/{{ pageSlots[3] }}/{{ pageSlots[4] }}"
        title: "{{ pageSlots[4] }}"
        url: "{{ pageSlots[4] }}"
    setModule: "{{ pageSlots[0] }}"
    setDisplayName: "{{ pageSlots[1] }}"
    setProductVersion: "{{ pageSlots[2] }}"
    setApiVersion: "{{ pageSlots[3] }}"
    setPageSlot: "{{ pageSlots[4] }}"
    title: "{{ pageSlots[4] }}"
    img: "/api/{{ pageSlots[0] }}/{{ pageSlots[2] }}/{{ pageSlots[3] }}/{{ pageSlots[4] }}/screenshot.png"
    file: "{{ pageSlots[5] }}"
---