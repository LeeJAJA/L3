import React, { useState, useEffect } from "react";
import { stateStore } from "../../stores";

import Map from "react-map-gl";

import mapboxgl from "mapbox-gl";

import DeckGL from "@deck.gl/react";
import * as d3 from "d3";

import { FlyToInterpolator, FirstPersonView, MapView } from "@deck.gl/core";
import {
  GeoJsonLayer,
  PolygonLayer,
  PointCloudLayer,
  PathLayer,
  ScatterplotLayer,
} from "@deck.gl/layers";
import { TripsLayer } from "@deck.gl/geo-layers";
import { DataFilterExtension } from "@deck.gl/extensions";

import {
  LightingEffect,
  AmbientLight,
  _SunLight as SunLight,
} from "@deck.gl/core";

// import floor_data from "../../data/map/l3_polys.json";
import floor_data from "../../data/map/l3_polys_fix.json";

// import edge_data from "../../data/map/l3_edges.json";
import edge_data from "../../data/map/l3_edges_fix.json";

import trip_data_goldilocks from "../../data/trips/segments_goldilocks_fixed.json";
import trip_data_high_pop from "../../data/trips/segments_high_pop_fixed.json";
import trip_data_low_pop from "../../data/trips/segments_low_pop_fixed.json";

import trip_data from "../../data/person_mobility/person_mobility_fixed.json";

// import trip_data_goldilocks_snowpath_2 from "../../data/trips/segments_goldilocks_fixed_snowpath_2.json";
import trip_data_goldilocks_snowpath_2 from "../../data/trips/l3_segments_fixed_snowpath_2.json";
import trip_data_high_pop_snowpath_2 from "../../data/trips/l3_segments_fixed_snowpath_2.json";
import trip_data_low_pop_snowpath_2 from "../../data/trips/l3_segments_fixed_snowpath_2.json";

import agg_edge_traffic from "../../data/trips/l3_segments_fixed_snowpath_2.json";

// import CAT_COLOR from "../../data/color/categorical_color_palette.json";
import CAT_COLOR from "../../data/color/l3_categorical_color_palette.json";
import AGENT_COLOR from "../../data/color/agent_categorical_color_palette.json";
import L3_HEATMAP from "../../data/color/l3_sequential_color_palette.json";

// @ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export const MAPBOX_TOKEN =
  "pk.eyJ1IjoiamFqYW1vYSIsImEiOiJjbDhzeDI4aHgwMXh6M3hrbmVxbG9vcDlyIn0.cdD4-PP7QcxegAsxlhC3mA";

const INITIAL_VIEW_STATE = {
  longitude: 34.989526,
  latitude: 28.120398,
  zoom: 16.1,
  maxZoom: 22,
  pitch: 60,
  maxPitch: 90,
  bearing: 229,
  transitionDuration: 1000,
  transitionInterpolator: new FlyToInterpolator(),
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 0.7,
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 18),
  color: [255, 255, 255],
  intensity: 1,
  //   _shadow: true,
  _shadow: false,
});

const landCover = [
  [
    [-71.004054, 42.55347106],
    [-71.004054, 42.15347106],
    [-71.304054, 42.55347106],
    [-71.304054, 42.25347106],
  ],
];

let polyMaterial = {
  ambient: 0.7,
  diffuse: 0.2,
  shininess: 12,
  specularColor: [255, 255, 255],
};

let agentMaterial = {
  ambient: 1,
  diffuse: 0.2,
  shininess: 0,
  specularColor: [255, 255, 255],
};

const getTooltip = ({ object }) => {
  //   <div><b>Global NODE ID:  </b>${object.properties.global_node_id}</div>
  //   <div><b>NODE ID:  </b>${object.properties.node_id}</div>
  return (
    object && {
      html: `\
  <div><b>Category:  </b>${object.properties["land_use"].split("_")[0]}</div>
  <div><b>Area:  </b>${object.properties.area.toFixed(2)} ft^2</div>
  <div><b>Floor:  </b>${object.properties.global_node_id.split("_")[0]}</div>
  `,
      style: {
        background: "#121212",
        border: "1px solid #2C2C2C",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "12px",
        color: "#FFFFFF",
      },
    }
  );
};

const catchError = (error) => console.log("catch error", error);

export default function CityMap({}) {
  const {
    selected,
    resetView,
    showFloors,
    showBelow,
    showTrips,
    showEdges,
    showSnow,
    showAmenitiesType,
    showAgemtType,
    keepBoundaries,
    agentDatasetId,
    time,
    setTime,
    timeStep,
    animationSpeed,
  } = stateStore;

  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [agentUpdate, setAgentUpdate] = useState(true);
  const [snowpathTimeIndex, setSnowpathTimeIndex] = useState(time);
  //   const [layers, setLayers] = useState([]);

  let TRIP_DATA = {
    1: trip_data_goldilocks,
    2: trip_data_high_pop,
    3: trip_data_low_pop,
  };

  let SNOWPATH_DATA = {
    1: trip_data_goldilocks_snowpath_2,
    2: trip_data_high_pop_snowpath_2,
    3: trip_data_low_pop_snowpath_2,
  };

  let SNOWPATH_COLOR = {
    1: [255, 255, 0, 230],
    2: [255, 0, 0],
    3: [0, 255, 0],
  };

  let line_width = 3;
  let below_line_width = 1;
  let edge_width = 1;

  //   const [time, setTime] = useState(8 * 3600);
  const [animation] = useState({});

  const animate = () => {
    // setTime((t) => (t + animationSpeed) % loopLength);
    timeStep();
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.2];
    return [lightingEffect];
  });

  //   let getAgentColor = (mode) => {
  //     // get current edge type
  //     // let findItemIndex = timestamp.findIndex((item) => item >= time);
  //     // let edge_type = modeArr[findItemIndex];
  //     if (mode == "Walk") {
  //       return [51, 160, 44];
  //     }
  //     if (mode == "Stairs") {
  //       return [255, 127, 0];
  //     }
  //     return [227, 26, 28];
  //   };

  String.prototype.convertToRGB = function (poly_opacity = 255) {
    if (this.length != 6) {
      throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16),
      poly_opacity,
    ];
    return aRgb;
  };

  let getFillColor = (data) => {
    let poly_opacity = selected[parseInt(data.properties.type.toString())]
      ? 255
      : 0;
    if (!showAmenitiesType) {
      return [255, 255, 255, poly_opacity];
    }
    let _color_id = data.properties.type.toString();
    let _hex_color = CAT_COLOR[_color_id];
    return _hex_color.slice(1, 7).convertToRGB(poly_opacity);
  };

  let getPolyLineColor = (data) => {
    let line_opacity =
      keepBoundaries || selected[parseInt(data.properties.type.toString())]
        ? 180
        : 0;
    if (!showAmenitiesType) {
      return [255, 255, 255, line_opacity];
    }
    let _color_id = data.properties.type.toString();
    let _hex_color = CAT_COLOR[_color_id];
    return _hex_color.slice(1, 7).convertToRGB(line_opacity);
  };

  let getEdgeLineColor = () => {
    let line_opacity = 50;
    return [255, 255, 255, line_opacity];
  };

  let floorFilterCheck = (data) => {
    if (!showFloors) return 0;
    if (keepBoundaries) return 1;
    let _color_id = parseInt(data.properties.type.toString());
    return selected[_color_id] ? 1 : 0;
  };

  let getAgentPosition = (data) => {
    for (var i = 0; i < data.timestamps.length; i++)
      if (data.timestamps[i] >= time) return data.coords[i];
    return data.coords[0];
  };

  let getAgentColor = (data) => {
    if (!showAgemtType) return [204, 106, 175, 255];
    let _color_id = data.profile.toString();
    let _hex_color = AGENT_COLOR[_color_id];
    return _hex_color.slice(1, 7).convertToRGB(255);
  };

  let getSnowPathColor = (data) => {
    let _color_id = Math.round(data.count).toString();
    let _hex_color = L3_HEATMAP[_color_id];
    console.log(_color_id);
    console.log( L3_HEATMAP[_color_id]);
    return _hex_color.slice(1, 7).convertToRGB(230);
  };

  const basicLayers = [
    new ScatterplotLayer({
      id: "scatterplot-layer",
      data: trip_data,
      pickable: false,
      opacity: 1,
      stroked: true,
      filled: true,
      radiusScale: 0.6,
      radiusMinPixels: 1.2,
      radiusMaxPixels: 100,
      radiusUnits: "pixels",
      billboard: true,

      // lineWidthMinPixels: 1,
      getPosition: (d) => getAgentPosition(d),
      getRadius: 1.2,
      getFillColor: (d) => getAgentColor(d),
      getLineColor: (d) => getAgentColor(d),
      getLineWidth: 0,

      getFilterValue: showTrips ? 1 : 0,
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],

      material: agentMaterial,

      updateTriggers: {
        getFilterValue: [showTrips],
        getFillColor: [showAgemtType],
        // getPosition: [time],
        getPosition: [agentUpdate],
      },

      transitions: {
        getPosition: {
          duration: 100,
          easing: d3.easeCubicInOut,
        },
      },
    }),

    new PathLayer({
      id: "snowpath-2",
      data: agg_edge_traffic[snowpathTimeIndex.toString()],
      //   data: SNOWPATH_DATA[agentDatasetId],
      //   pickable: true,
      billboard: true,
      widthScale: 1,
      widthMinPixels: 0.2,

      getPath: (d) => d.path,
      getColor: (d) => getSnowPathColor(d),
      getWidth: (d) => d.count * 4,

      getFilterValue: showSnow ? 1 : 0,
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],

      updateTriggers: {
        getFilterValue: [showSnow],
        data: [snowpathTimeIndex],
      },
    }),

    new GeoJsonLayer({
      id: "floor",
      data: floor_data,
      opacity: showAmenitiesType ? 0.04 : 0.02,
      pickable: true,
      stroked: true,

      wireframe: true,
      lineWidthMinPixels: 3,
      getLineWidth: line_width,
      lineWidthUnits: "pixels",
      lineBillboard: true,

      getFillColor: (f) => getFillColor(f),
      getLineColor: (f) => getPolyLineColor(f),

      getFilterValue: (f) => floorFilterCheck(f),
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],

      material: polyMaterial,

      autoHighlight: true,
      highlightColor: [0, 0, 128, 128],

      updateTriggers: {
        getLineColor: [selected, showAmenitiesType],
        getFillColor: [selected, showAmenitiesType],
        getFilterValue: [selected, showFloors, keepBoundaries],
      },
    }),

    new GeoJsonLayer({
      id: "edge",
      data: edge_data,
      opacity: 0.1,
      pickable: false,

      lineWidthMinPixels: edge_width,
      getLineWidth: edge_width,
      lineWidthUnits: "pixels",

      getLineColor: (f) => getEdgeLineColor(f),

      getFilterValue: showEdges ? 1 : 0,
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],

      updateTriggers: {
        getFilterValue: [showEdges],
      },
    }),

    // new TripsLayer({
    //   id: "trips",
    //   data: TRIP_DATA[agentDatasetId],
    //   getPath: (f) => f.path,
    //   getTimestamps: (f) => f.timestamps,
    //   getColor: (f) => getAgentColor(f.mode),
    //   billboard: true,
    //   opacity: 0.8,
    //   widthMinPixels: 8,
    //   rounded: true,
    //   trailLength: 20,
    //   currentTime: time,
    //   shadowEnabled: false,

    //   getFilterValue: showTrips ? 1 : 0,
    //   filterRange: [1, 1],
    //   extensions: [new DataFilterExtension({ filterSize: 1 })],

    //   updateTriggers: {
    //     getFilterValue: [showTrips],
    //     data: [agentDatasetId],
    //   },
    // }),

    // new PointCloudLayer({
    //   id: "snowpath",
    //   data: SNOWPATH_DATA[agentDatasetId],
    //   pickable: false,
    //   //   coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
    //   //   coordinateOrigin: [-122.4, 37.74],
    //   sizeUnits: "meters",
    //   radiusPixels: 4,
    //   getPosition: (d) => d.position,
    //   getNormal: [-1, 0, 0],
    //   getColor: SNOWPATH_COLOR[agentDatasetId],

    //   getFilterValue: showSnow ? 1 : 0,
    //   filterRange: [1, 1],
    //   extensions: [new DataFilterExtension({ filterSize: 1 })],

    //   updateTriggers: {
    //     getFilterValue: [showSnow],
    //     data: [agentDatasetId],
    //     getColor: [agentDatasetId],
    //   },
    // }),
  ];

  useEffect(() => {
    // console.log(resetView, viewState);
    setViewState({
      longitude: 34.989626,
      latitude: 28.119398,
      zoom: 16.4,
      maxZoom: 22,
      pitch: 60,
      maxPitch: 90,
      bearing: 149,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }, [resetView]);

  useEffect(() => {
    //   console.log(time);
    if (time % (3 * animationSpeed) == 0) setAgentUpdate(!agentUpdate);
    setSnowpathTimeIndex(Math.round(time / 600) * 600);
  }, [time]);

  return (
    <DeckGL
      layers={basicLayers}
      effects={effects}
      initialViewState={viewState}
      controller={true}
      getTooltip={getTooltip}
      onError={catchError}
    >
      <MapView
        id="map"
        x="0%"
        width="100%"
        height="100%"
        controller={true}
        orthographic={false}
        fovy={60}
      ></MapView>

      {/* <Map
        reuseMaps
        mapStyle={MAP_STYLE}
        preventStyleDiffing={true}
        mapboxAccessToken={MAPBOX_TOKEN}
      /> */}
    </DeckGL>
  );
}
