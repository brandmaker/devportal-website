## Location
The location of this slot is the timeline tooltip of the 'Marketing Planner Calender'. This tooltip is showing when the user hovers over a timeline.\
Within the hover element, the slot is positioned under the base details and above the content enrichment.

## UI specifics
The component should have a min-width and a min-height, so the tooltip resizes accordingly. Any other styling is optional.

## Slot attributes
|  | Name        | Purpose       | Type       | Defaults |
|-:|:------------|:--------------|:-----------|:---------|
|1 | `nodeId`    | Unique identifier for a calender element (row) | `NUMBER`   | none     |
|2 | `timelineId`| Identifies a timeline (entry in a calender row) | `NUMBER`   | none     | 

With the help of these two variables, data can be fetched through a provided API. After the successful gathering of the data, the component will render, displaying the received information from the response.\
Other attributes of the component, like styles or the HTML code, are encapsulated within the Fusion UX App. 

The variables are not watched and will not be picked up by the caller later again. 

## Callback functions
|  | Purpose       | Synopsis   | Return values |
|-:|---------------|:-----------|:--------------|
|  | no callback functions provided| | |

## Error states
There are no error states or error messages provided.

If the component does not render anything, the slot will be left empty. Since this behavior is normal and expected, the display from the rest of the tooltip remains unaffected.

## Other specifics or annotations
None
