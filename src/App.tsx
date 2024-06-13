import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Cookies from 'js-cookie';

import { GrowthBook, GrowthBookProvider , useFeatureIsOn } from "@growthbook/growthbook-react";

console.log("cookie" , Cookies.get('cn-debug'))
const growthbook = new GrowthBook({
  apiHost: "https://growthbook-proxy-platform-intel.gp-nonprod-na-0.conde.digital",
  clientKey: "sdk-JMxlG3FbcBwYE0MN",
  enableDevMode: Cookies.get('cn-debug') === "true",
  // subscribeToChanges: true,
  attributes: {
          id: '4543',
  },
  trackingCallback: (experiment, result) => {
    console.log({experiment})
    // TODO: Use your real analytics tracking system
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key
    });
  }
});

growthbook.init({
  // Optional, enable streaming updates
  streaming: true
})

console.log('grothboo' , growthbook)

function getRuleId(experimentsData: any , gbAssignment: any ,experimentId: string) {

  let ruleId = 0
  if(!experimentsData[experimentId]?.rules){
    return ruleId
  }else {
    if(gbAssignment.source === "experiment"){
      const ruleIndex = experimentsData[experimentId]?.rules.findIndex((rule : any) => rule.seed === gbAssignment.experiment.seed)
      ruleId = ruleIndex === -1 ? 0 : ruleIndex
    }
    if(gbAssignment.source === "force"){
      const ruleIndex = experimentsData[experimentId]?.rules.findIndex((rule : any) => rule.force === gbAssignment.value)
      ruleId = ruleIndex === -1 ? 0 : ruleIndex
    }
  }

  return ruleId;
}


function App() {

  React.useEffect(() => {

    // fetch api here


    async function load(){
     
      // const stagGrowthbook = new GrowthBook({
      //   apiHost: "https://growthbook-proxy-platform-intel.gp-nonprod-na-0.conde.digital",
      //   clientKey: "sdk-JMxlG3FbcBwYE0MN",
      //   enableDevMode: true,
      //   subscribeToChanges: true,
      //   attributes: {
      //     id: '4543',
      //   }
      // });

      // console.log({stagGrowthbook})
  
      // await stagGrowthbook.init();
     
      // const t = await stagGrowthbook.getFeatures();

      // console.log({t})

      // const a = stagGrowthbook.getFeatureValue("glamour_addensity_commerce_payload_test" , {});

      //   console.log({a})
      
      // Load features asynchronously when the app renders
     


    }

    load()
   
  }, []);

  return (
    <div className="App">
        <GrowthBookProvider growthbook={growthbook}>
          <MyComponent />
        </GrowthBookProvider>
    </div>
  );
}

function MyComponent() {
  const enabled = true;
  // const enabled = useFeatureIsOn("test-feature");
  
  if (enabled) {
    return <div>On!</div>
  } else {
    return <div>Off!</div>
  }
}

export default App;
