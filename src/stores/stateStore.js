import resso from "resso";

const getSelected = () => {
  let selected_status = {};
  for (var i = 0; i < 50; i++) selected_status[i] = true;
  return selected_status;
};

export const stateStore = resso({
  selected: getSelected(),
  resetSeleted: (value) => {
    stateStore.selected = getSelected();
  },
  setSelected: (value) => {
    stateStore.selected = value;
  },
  updateSelected: (index, value) => {
    let newObj = stateStore.selected;
    newObj[index] = !newObj[index];
    stateStore.selected = JSON.parse(JSON.stringify(newObj));
  },
  warning: false,
  setWarning: (value) => {
    stateStore.warning = value;
  },
  checkValid: (dataKey, value) => {
    return stateStore.barCharts[dataKey][0]["value"] - value >= 0;
  },
  showAmenitiesType: true,
  updateShowAmenitiesType: () => {
    stateStore.showAmenitiesType = !stateStore.showAmenitiesType;
  },
  keepBoundaries: true,
  updateKeepBoundaries: () => {
    stateStore.keepBoundaries = !stateStore.keepBoundaries;
  },
  showFloors: true,
  updateShowFloors: () => {
    stateStore.showFloors = !stateStore.showFloors;
  },
  showBelow: true,
  updateShowBelow: () => {
    stateStore.showBelow = !stateStore.showBelow;
  },
  showTrips: true,
  updateShowTrips: () => {
    stateStore.showTrips = !stateStore.showTrips;
  },
  showAgemtType: true,
  updateShowAgemtType: () => {
    stateStore.showAgemtType = !stateStore.showAgemtType;
  },
  showEdges: true,
  updateShowEdges: () => {
    stateStore.showEdges = !stateStore.showEdges;
  },
  showSnow: false,
  updateShowSnow: () => {
    stateStore.showSnow = !stateStore.showSnow;
  },
  resetView: true,
  updateResetView: () => {
    // console.log(stateStore.resetView)
    stateStore.resetView = !stateStore.resetView;
  },
  agentDatasetId: 1,
  updateAgentDatasetId: (index) => {
    stateStore.agentDatasetId = index;
  },
  loopLength: 86400, // unit corresponds to the timestamp in source data
  animationSpeed: 1, // unit time per second
  time: 8 * 3600, // init time
  setTime: (value) => {
    stateStore.time = value;
  },
  resetTime: () => {
    stateStore.time = 8 * 3600;
  },
  timeStep: () => {
    stateStore.time =
      (stateStore.time + stateStore.animationSpeed) % stateStore.loopLength;
  },
});
