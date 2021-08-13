function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // Bar Chart 
    // 3. Create a variable that holds the samples array. 
      var sampleData = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = sampleData.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // 8. Create the trace for the bar chart. 
    var trace = 
    { y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"};

    var barData = [trace];
      
    // 9. Create the layout for the bar chart. 
    var barLayout = {title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }};

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    
    //Bubble Chart
    // 1. Create the trace for the bubble chart.
    var trace2 = 
    { x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"}};

    var bubbleData = [trace2];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {title: "Bacteria Cultures Per Sample",
        hovermode: "closest",
        xaxis: { title: "OTU ID"}};
    
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // Gauge Chart 
    // Create a variable that holds the samples array. 
          //above 
    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
          //above
    // Create a variable that holds the first sample in the array.
          //above

    // 2. Create a variable that holds the first sample in the metadata array.
          //above

    // 3. Create a variable that holds the washing frequency.
        var washfreq = parseInt(resultArray)
    var gaugeData = [
      {
        // domain: { x: [0, 1], y: [0, 1] },
        value: washfreq,
        title: { text: "Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",

        // delta: { reference: 380 },
        gauge: {
          axis: { range: [0, 10], tickcolor: "darkblue" }
          steps: [
            { range: [0, 5], color: "lightgray" },
            { range: [5, 10], color: "gray" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 10
          }
        }
        // bgcolor:
      }
    ];
    
    var gaugeLayout = {
      width: 200,
      height: 370,
      margin: { t: 25, r: 25, l: 25, b: 25 },

    Plotly.newPlot('gauge', gaugeData, gaugeLayout);

    
  });
}
