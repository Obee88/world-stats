import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from "d3";
import world from '../data/countries';
import * as topojson from 'topojson';
import { getCountryData } from '../data/countryData.ts';
import { calculateColor } from '../data/statistics.ts'
import './map.css';
import { getSelectedCountryId, getSelectedStatistic } from '../state/selectors';
import { selectCountry } from '../state/actions';

const Map = () => {
  const dispatch = useDispatch();
  const onSelectCountry = (id) => dispatch(selectCountry(id));
  const selectedCountryId = useSelector(getSelectedCountryId);
  const selectedStatistic = useSelector(getSelectedStatistic);
  const [selectedState, setSelectedState] = useState();
  const renderSvg = () => {
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9; //1600, height = 1000;

    const projection = d3.geoMercator()
                    .translate([480, 520])
                    .scale(200);

    const path = d3.geoPath()
        .projection(projection);

    const redraw = () => { 
       svg.attr("transform", d3.event.transform);
       // "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    const svg = d3.select(".world-map")
      .append("svg")
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
        if (selectedStatistic === 'none' && a[i] !== selectedState) {
          a[i].style.fill = 'orange';
        }
      })
      .on('mouseout', (d,i,a) => {
        if (selectedStatistic === 'none' && a[i] !== selectedState) {
          a[i].style.fill = 'black';  
        }
      })
      .on('click', (d,i,a) => {
        if (selectedState === a[i]) {
          setSelectedState(null);
          onSelectCountry(null);
          if (selectedStatistic === 'none') {
            a[i].style.fill = 'orange';
          }
        } else {
          if (selectedStatistic === 'none' && selectedState) {
            selectedState.style.fill = 'black';
          }
          setSelectedState(a[i]);
          onSelectCountry(d.id);
          if (selectedStatistic === 'none') {
            a[i].style.fill = 'blue';
          }
        }
      })
  }

  useEffect(renderSvg, []);
  useEffect(
    () => {
      d3.selectAll(".country")
        .style("fill",(object,i,all) => {
          const color = calculateColor(selectedStatistic, object.id);
          return color;
        });
    },
    [selectedStatistic],
  );

  return (
    <div className="world-map"></div>
  );
}

export default Map;
