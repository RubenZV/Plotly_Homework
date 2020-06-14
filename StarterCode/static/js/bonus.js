function buildMetadata(sample) {
    // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
    var url = `/metadata/${sample}`;
    d3.json(url).then(function(sample){
  
      // Use d3 to select the panel with id of `#sample-metadata`
      var sample_metadata = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      sample_metadata.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
      Object.entries(sample).forEach(function ([key, value]) {
        var row = sample_metadata.append("panel-body");
        row.text(`${key}: ${value} \n`);
      });
    });
  }