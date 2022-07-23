import { set } from "nprogress";
import React, { useState, useEffect } from "react";

const Tabs = ({ children }) => {

  // console.log('====================================');
  // console.log(children[0].props.label);
  // console.log('====================================');
  
  const initialTab = children[0].props.label;
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeTabSet, setactiveTabSet] = useState("first");

  // useEffect(() => {
    


  // }, [activeTabSet]);



  const theTabs = children.map((child) => {
    
     if (child.props.children === "...") {
       return (
         <li 
            className="tabs__tab" 
            key={child.props.label}
            onClick={() => { changeSet()}}
          >
           {child.props.tabName}
         </li>
       );
     } else {
       return (
         <li
           onClick={() => {
             setActiveTab(child.props.label);
           }}
           className={
             child.props.label === activeTab
               ? "tabs__tab tabs__tab-active"
               : "tabs__tab"
           }
           key={child.props.label}
         >
           {child.props.tabName}
         </li>
       );
     }

  })

  const tabContent = children.filter(
    (child) => {

      if (child.props.label === "etc") {
        return
      }

      return (
        child.props.label === activeTab
      )
    }
  );
  
  const firstSet = theTabs.slice(0,4);
  const nextSet = theTabs.slice(4)
  console.log(firstSet);

  const changeSet = () => {

    if (activeTabSet === "first") {
      setactiveTabSet("next")
      setActiveTab(nextSet[1].props.children);

    } else {
      setactiveTabSet("first")
      setActiveTab(firstSet[0].props.children);
    }

  }


 return (
   <>
     <div className="tabs">
      {activeTabSet === "first" ? firstSet : nextSet}
      </div>
     {tabContent}
   </>
 );
  
};

const Tab = (props) => {
  return <>{props.children}</>;
}

export { Tabs, Tab };