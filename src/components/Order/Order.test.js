import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Order from "./Order";

describe("<Order />", () => {
  it("should render one <div /> element.", () => {
    const wrapper = shallow(<Order />);
    expect(wrapper.find("div")).toHaveLength(1);
  });
});
