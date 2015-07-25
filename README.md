# Zhart
Real time charting library.


To run, do:
npm install
bower install
serve with your favorite server
go to /sample/sample.html

Zhart(js)
Users can mix in any combination of features and layers without worrying about conflicts.
The developer can write new features and layers without worrying about a chart's state.

Features and layers have their own set, init/draw, and destroy functions.
set - modifies options that init/draw closes on
init - initializes a feature for the chart
draw - draws a layer on top of chart's svg
destroy - for cleanly removing the feature/layer