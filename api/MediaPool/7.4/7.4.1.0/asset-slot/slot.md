## Location
The location of this slot is a custom tab in the Asset Details view of any asset in Media Planner. The tab is displayed in a preset position among the other tabs in this view. When the custom tab is selected, a Fusion UX component is rendered in the tab's content area.

## UI specifics
All styling is optional.

## Slot attributes
|  | Name        | Purpose                                                              | Type     | Defaults |
|-:|:------------|:---------------------------------------------------------------------|:---------|:---------|
|1 | `fux-asset-id`    | Specifies the unique id of an asset                                  | `NUMBER` | none     |
|2 | `fux-custom-tab-title`| Specifies the text label of the custom tab in the Asset Details view | `STRING` | none     | 

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
