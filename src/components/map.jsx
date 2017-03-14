import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import world from '../data/countries.js';
import * as topojson from 'topojson';
import './map.css';
import { getCountryData } from '../data/countryData.js';
import { calculateColor } from '../data/statistics.js'

class Map extends React.Component {
  constructor(props) {
    super(props);
    const self = this; 
    self.state = {
      selectedState: null,
      world: world,
    }
  }

  componentDidMount() {
    this.renderSvg();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedStatistic } = nextProps;
    const countryes = d3.selectAll(".country")
      .style("fill",(object,i,all) => {
        const color = calculateColor(selectedStatistic, object.id);
        return color;
      });
  }

  renderSvg() {
    const width = window.innerWidth * 0.9, height = window.innerHeight * 0.9; //1600, height = 1000;

    // const color = d3.scale.category10();

    const projection = d3.geoMercator()
                    .translate([480, 300])
                    .scale(970);

    const path = d3.geoPath()
        .projection(projection);

    const redraw = () => { 
       svg.attr("transform",d3.event.transform);// "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    const svg = d3.select(".world-map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("margin-top", window.innerHeight * 0.05)
    .style("margin-left", window.innerWidth * 0.05)
    .style("background-color","#eee")
    .call(
      d3.zoom().on("zoom", redraw)
    )
    .append("g");

    const tooltip = d3.select("#map").append("div").attr("class", "tooltip");
    const { world } = this.state;
    const countries = topojson.feature(world, world.objects.countries).features;
    // const neighbors = topojson.neighbors(world, countries);
    const i = -1, n = countries.length;

    const country = svg.selectAll(".country").data(countries);
    const poligons = country
      .enter()
      .insert("path")
        .attr("class", "country")    
        .attr("title", (d) => (getCountryData(d.id) ? getCountryData(d.id).name : d.id))
        .attr("d", path)
        .style("fill", "black");

    const self = this;
    const highlights = d3.selectAll('.country')
      .on('mouseover', (d,i,a) => {
        if (this.props.selectedStatistic === 'none' && a[i] !== this.state.selectedState) {
          a[i].style.fill = 'orange';
        }
      })
      .on('mouseout', (d,i,a) => {
        if (this.props.selectedStatistic === 'none' && a[i] !== this.state.selectedState) {
          a[i].style.fill = 'black';  
        }
      })
      .on('click', (d,i,a) => {
        if (this.props.selectedStatistic === 'none') {
          return;
        }
        if (self.state.selectedState === a[i]) {
          self.setState({ selectedState: null });
          self.props.countrySelected(null);
          a[i].style.fill = 'orange';
        } else {
          if (self.state.selectedState) {
            self.state.selectedState.style.fill = 'black';
          }
          self.setState({ selectedState: a[i] });
          self.props.countrySelected(d.id);
          a[i].style.fill = 'blue';
        }
      })


    // paths.forEach(function(p){
    //     var pp = d3.select(p);
    //     pp
    //     .on("mouseover", function(d,i,a,b,c) {
    //       pp.style("fill", "orange");
    //     })
    //     .on("mouseout",  function(d,i) {
    //       pp.style("fill", "black");
    //     });

    //   })
  }

  

  render() {
    return (
      <div className="world-map"></div>
    );
  }
}

Map.propTypes = {
  selectedStateId: PropTypes.number,
  countrySelected: PropTypes.func,
  selectedStatistic: PropTypes.string,
};

const mapStateToProps = (state) => ({
  selectedStateId: state.selectedStateId,
  selectedStatistic: state.selectedStatistic,
});

const mapDispatchToProps = (dispatch) => ({
  countrySelected(id) {
    dispatch({ type: "select-country", data: {id} });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
