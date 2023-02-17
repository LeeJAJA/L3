import React, { useState, useEffect } from "react";

import CityMap from "./CityMap";

import styles from "./Sandbox.module.css";

import ClockCard from "./ClockCard";
import PanelCard from "./PanelCard";
import VotingCard from "./VotingCard";
import IndicatorCard from "./IndicatorCard";

import ToggleButton from "../0.1_buttons/ToggleButton";
import CusSliders from "../0.5_slider/CusSliders";

import _AMENITIES_DATA from "../../data/l3_layer_types.json";

import { stateStore } from "../../stores";

const Neom = () => {
  const {
    selected,
    updateSelected,
    resetView,
    updateResetView,
    showFloors,
    updateShowFloors,
    showBelow,
    updateShowBelow,
    showTrips,
    updateShowTrips,
    showEdges,
    updateShowEdges,
    showSnow,
    updateShowSnow,
    showAmenitiesType,
    updateShowAmenitiesType,
    keepBoundaries,
    updateKeepBoundaries,
    agentDatasetId,
    updateAgentDatasetId,
    showAgemtType,
    updateShowAgemtType,
    resetTime,
  } = stateStore;

  let button_set_layer = [];
  let button_set_amen = [];
  let button_set_floor = [];
  let button_set_dataset = [];
  let button_set_clock = [];
  let button_set_agent = [];

  const [showPanels, setShowPanels] = useState(true);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") setShowPanels(!showPanels);
  });

  button_set_clock.push(
    <div className={styles.rowGroup} key={"resetclock"}>
      <ToggleButton
        isSelected={false}
        toggle={() => {
          resetTime();
        }}
        buttonText={"Reset Clock"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_dataset.push(
    <div className={styles.rowGroup} key={"goldilocks"}>
      <ToggleButton
        isSelected={agentDatasetId == 1}
        toggle={() => {
          updateAgentDatasetId(1);
        }}
        buttonText={"trip_data_goldilocks"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_dataset.push(
    <div className={styles.rowGroup} key={"high_pop"}>
      <ToggleButton
        isSelected={agentDatasetId == 2}
        toggle={() => {
          updateAgentDatasetId(2);
        }}
        buttonText={"trip_data_high_pop"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_dataset.push(
    <div className={styles.rowGroup} key={"low_pop"}>
      <ToggleButton
        isSelected={agentDatasetId == 3}
        toggle={() => {
          updateAgentDatasetId(3);
        }}
        buttonText={"trip_data_low_pop"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_floor.push(
    <div className={styles.rowGroup} key={"showAmenitiesType"}>
      <ToggleButton
        isSelected={showAmenitiesType}
        toggle={() => {
          updateShowAmenitiesType();
        }}
        buttonText={(showAmenitiesType ? "Show " : "Hide ") + "Amenities Type"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_floor.push(
    <div className={styles.rowGroup} key={"keepBoundaries"}>
      <ToggleButton
        isSelected={keepBoundaries}
        toggle={() => {
          updateKeepBoundaries();
        }}
        buttonText={(keepBoundaries ? "Keep " : "Hide ") + "Boundaries"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_agent.push(
    <div className={styles.rowGroup} key={"showAgemtType"}>
      <ToggleButton
        isSelected={showAgemtType}
        toggle={() => {
          updateShowAgemtType();
        }}
        buttonText={(showAgemtType ? "Show " : "Hide ") + "Agent Type"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_layer.push(
    <div className={styles.rowGroup} key={"reset"}>
      <ToggleButton
        isSelected={false}
        toggle={() => {
          updateResetView();
        }}
        buttonText={"Reset View"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_layer.push(
    <div className={styles.rowGroup} key={"showFloors"}>
      <ToggleButton
        isSelected={showFloors}
        toggle={() => {
          updateShowFloors();
        }}
        buttonText={(showFloors ? "Show " : "Hide ") + "Floors"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  //   button_set_layer.push(
  //     <div className={styles.rowGroup} key={"showBelow"}>
  //       <ToggleButton
  //         isSelected={showBelow}
  //         toggle={() => {
  //           updateShowBelow();
  //         }}
  //         buttonText={(showBelow ? "Show " : "Hide ") + "Below Floors"}
  //         positionStyle={styles.layer_vis_button}
  //         colorIndex={0}
  //         largeFont={false}
  //       />
  //     </div>
  //   );

  button_set_layer.push(
    <div className={styles.rowGroup} key={"showTrips"}>
      <ToggleButton
        isSelected={showTrips}
        toggle={() => {
          updateShowTrips();
        }}
        buttonText={(showTrips ? "Show " : "Hide ") + "Agents"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_layer.push(
    <div className={styles.rowGroup} key={"showSnow"}>
      <ToggleButton
        isSelected={showSnow}
        toggle={() => {
          updateShowSnow();
        }}
        buttonText={(showSnow ? "Show " : "Hide ") + "Snowpath(WIP)"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  button_set_layer.push(
    <div className={styles.rowGroup} key={"showEdges"}>
      <ToggleButton
        isSelected={showEdges}
        toggle={() => {
          updateShowEdges();
        }}
        buttonText={(showEdges ? "Show " : "Hide ") + "Edges"}
        positionStyle={styles.layer_vis_button}
        colorIndex={0}
        largeFont={false}
      />
    </div>
  );

  if (_AMENITIES_DATA) {
    for (var i = 0; i < _AMENITIES_DATA.length; i++) {
      let index = _AMENITIES_DATA[i]["id"];
      button_set_amen.push(
        <div className={styles.rowGroup} key={index}>
          <ToggleButton
            isSelected={selected[index]}
            toggle={() => {
              updateSelected(index);
            }}
            buttonText={_AMENITIES_DATA[i].name}
            positionStyle={styles.layer_vis_button}
            colorIndex={parseInt(_AMENITIES_DATA[i].id)}
            largeFont={false}
          />
        </div>
      );
    }
  }

  const PolicyVoteCard = () => {
    return (
      <VotingCard
        title="Incentive for Developers"
        subTitle="Voting Panel"
        content={<CusSliders />}
      />
    );
  };

  const DatasetCard = () => {
    let content = (
      <div>
        <div className={styles.amen_list}>{button_set_dataset}</div>
      </div>
    );
    return (
      <VotingCard
        title="Visualization"
        subTitle="Dataset Control Panel"
        content={<div className={styles.buttonGroup}>{content}</div>}
      />
    );
  };

  const LayerControlCard = () => {
    let content = (
      <div>
        <div className={styles.amen_list}>{button_set_layer}</div>
      </div>
    );
    return (
      <VotingCard
        title="Visualization"
        subTitle="Layers Control Panel"
        content={<div className={styles.buttonGroup}>{content}</div>}
      />
    );
  };

  const FloorsControlCard = () => {
    let content = (
      <div>
        <div className={styles.amen_list}>{button_set_floor}</div>
      </div>
    );
    return (
      <VotingCard
        title="Visualization"
        subTitle="Floors Control Panel"
        content={<div className={styles.buttonGroup}>{content}</div>}
      />
    );
  };

  const AmenitiesTypeControlCard = () => {
    let content = (
      <div>
        <div className={styles.amen_list}>{button_set_amen}</div>
      </div>
    );
    return (
      <VotingCard
        title="Visualization"
        subTitle="Amenities Panel"
        content={<div className={styles.buttonGroup}>{content}</div>}
      />
    );
  };

  const AgentTypeControlCard = () => {
    let content = (
      <div>
        <div className={styles.amen_list}>{button_set_agent}</div>
      </div>
    );
    return (
      <VotingCard
        title="Visualization"
        subTitle="Agent Mobility Panel"
        content={<div className={styles.buttonGroup}>{content}</div>}
      />
    );
  };

  return (
    <div>
      <div id="protected_map" className={styles.mapProtectionWrapper}>
        <CityMap className={styles.visualization} />
      </div>
      {showPanels ? (
        <div
          className={`${styles.containerFluid} ${styles.h100} ${styles.w100} ${styles.flexRow}`}
        >
          <div className={`${styles.scroll_layer}`}>
            <div
              className={`${styles.panelCol} ${styles.col3} ${styles.flexCol}`}
              id="protected_ul"
            >
              <ClockCard controller={button_set_clock} />
              {/* <PolicyVoteCard /> */}
              <LayerControlCard />
              <FloorsControlCard />
              <AmenitiesTypeControlCard />
              <AgentTypeControlCard />
              <DatasetCard />
            </div>
          </div>

          <div className={`${styles.col}`}></div>
          <div
            className={`${styles.outputCol} ${styles.col3} ${styles.flexCol}`}
            id="protected_ur"
          ></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Neom;
