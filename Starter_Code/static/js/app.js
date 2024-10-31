// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metadata=data.metadata;


    // Filter the metadata for the object with the desired sample number
    const result=metadata.filter(meta=>meta.id===sample)[0];


    // Use d3 to select the panel with id of `#sample-metadata`
    const panel=ds.select("sample-metadata");


    // Use `.html("") to clear any existing metadata
    panel.html("")


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples=data.samples;


    // Filter the samples for the object with the desired sample number
    const resultArray=samples.filter(meta=>meta.id===sample)[0];


 

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids=resultArray.otu_ids;
    const otu_labels=resultArray.otu_labels;
    const sample_values=resultArray.sample_values;


    // Build a Bubble Chart
    const bubbleChart={
      x: otu_ids, 
      y: sample_values,
      text: otu_labels,
      mode:'markers',
      marker:{
        size:sample_values,
        color:otu_ids, 
        colorscale:'Earth'

      }
    };
    const bubbleData = [bubbleChart];

    const bubbleOrg={
      title:'Bubble Chart of OTUs',
      xaxis:{title: 'OTU IDs'},
      yaxis:{title:'Sample VAlues'},
      hovermode:'closest'
    }


    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleOrg);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const ysticks=otu_ids.slice(0, 10).map(otu_ids=>'OTU ${otuID').reverse();
    const bardt=sample_values.slice(0,10).reverse();
    const barlbl=otu_labels.slice(0,10).reverse();
    



    // Build a Bar Chart
    const barChart={
      x: otu_ids, 
      y: bardt,
      text: barlbl,
      type:'bar',
      orientation: 'h'
    };
    const barData = [barChart];
    // Don't forget to slice and reverse the input data appropriately
    const barOrg={
      title:'Top 10 OTUs',
      yaxis:{title: 'OTU IDs'},
      xaxis:{title:'Sample VAlues'}
    }


    // Render the Bar Chart
    Plotly.newPlot('bar', bubbleData, barOrg);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const names=data.names;


    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdown=ds.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((sample)=>{
      dropdown.append("option")
          .text(sample)
          .propert("value", sample);
    })


    // Get the first sample from the list
    const stsample=names[0];


    // Build charts and metadata panel with the first sample
    buildCharts(stsample);
    buildMetadata(stsample);


  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
