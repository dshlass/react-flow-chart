import * as React from "react";
import { FlowChartWithState } from "../src";
import { Page } from "./components";
import { chartSimple } from "./misc/exampleChartState";
import { DefaultComponents } from './misc/defaultComponents'

export const SmartRouting = () => {
  return (
    <Page>
      <FlowChartWithState
        Components={DefaultComponents}
        config={{ smartRouting: true }}
        initialValue={chartSimple}
      />
    </Page>
  );
};
