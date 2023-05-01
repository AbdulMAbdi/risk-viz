# Risk Analysis Work Sample for UI/UX Developers

Given the following sample [Climate Risk Rating dataset](https://docs.google.com/spreadsheets/d/1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw/edit#gid=681415175),created an interactive web application that displays the data from the sample in table, chart and interactive map form.

## Overview

### Filter Menus:

- The Asset Name menu will allow you to find locations represented by the selected asset name
- The Region menu will allow you to filter locations by continent
- The Risk Factor menu will allow you to filter by various risk factors and update risk ratings to the risk for that specific factor
- The Decade menu will allow you to filter by decade
- The Business Category Menu will allow you to filter by industry
- Filter selections can be combined and persist across the chosen data display

### Data Displays:

#### Map:

- Green markers indicate a location that has a risk rating less than 0.33
- Orange markers indicate a location that has a risk rating less than 0.66 but greater than 0.33
- Red Markers indicate a location that has a risk rating greater than 0.66

- Click a marker to get more information on the asset at that location

#### Chart:

The Line Chart button will represent the data on a line graph. X axis represents the year and will adapt to decade filters, the default is all decades in the data set. The Y axis represents risk rating and adapts to risk factor filter (i.e if Earthquake risk factor is selected then the earthquake rating will be used)

#### Table:

The Data Table button will show the data in a table where selected filters will apply, and filters can continue to be applied. Sorting by descending or ascending order is available on columns. The risk factors column can be filtered to include data points that have only the chosen risk factor, this can also be accomplished by using the risk factor dropdown menu located in the navigation bar.

#### Averages Chart:

The Averages Chart button will allow you to see what the average risk rating for specific risk factors are. All the filter options from the dropdown menus will apply when calculating averages

The Data Table button will show the data in a table where selected filters will apply, and filters can continue to be applied. Sorting by descending or ascending order is available on columns. The risk factors column can be filtered to include data points that have only the chosen risk factor, this can also be accomplished by using the risk factor dropdown menu located in the navigation bar.

## Notes
- The sample data is manipulated in the code to allow for a better representation of the data. Specifically, the location data is randomized evenly across the regions to allow for a better visualization of the markers on the map. The year data is also randomized so that there are more years represented besides just the first year of every decade.
- Best viewed on desktop, mobile optimizations are being developed

## Sources and Libraries

Various code examples and demonstrations from the following documentation was used to create this web application.

- [React-GoogleMaps](https://tomchentw.github.io/react-google-maps/#documentation)
- [Google Maps](https://developers.google.com/maps/documentation/javascript)
- [Tailwind](https://tailwindcss.com/docs/)
- [MaterialUI](https://mui.com/material-ui/api/)
- [PapaParse](https://www.papaparse.com/docs)
- [React](https://react.dev/reference/react)
- [Next](https://nextjs.org/docs/)


