## Location
The slot is in the timeline tooltip of the Marketing Planner Calendar. The tooltip is shown when the user hovers over the timeline of the calendar.
In the tooltip the slot is positioned under the base details and above of the content enrichment.

## UI specifics
The webcomponent should have a min-width and a min-height. We implemented only min-width requirement for the webcomponent, so the tooltip resizes accordingly.\
Any other styling is optional.

## Slot attributes
| Name        | Purpose       | Type       | Defaults |
|:------------|:--------------|:-----------|:---------|
| `nodeId`    | ??            | `NUMBER`   | none     |
| `timelineId`| ??            | `NUMBER`   | none     | 

These two variables are provided to the webcomponent by the slot. The webcomponent can use these variables to fetch data by using an API. After data is successfully gathered by the webcomponent, the webcomponent is displayed with the needed response variables shown in the webcomponent. Everything other is encapsulated within the component ( styles, html ). 

The variables are not watched and will not be picked up by the caller later again. 

## Callback functions
| Purpose       | Synopsis   | Return values |
|---------------|:-----:| --------:|

## Error states
No error messages or states are provided.

If the component does not render anything, it won’t be shown in the tooltip. This will not affect the tooltip, the regular information will still be displayed in the tooltip. Therefore, the UI will not be affected in a negative way. It is common behavior to not show the component.

## Other specifics or annotations
None
