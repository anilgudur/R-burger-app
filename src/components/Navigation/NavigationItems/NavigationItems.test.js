import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import React from "react";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> elements if not authenticated.", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render two <NavigationItem /> elements if authenticated.", () => {
    //wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should an exact logout button.", () => {
    wrapper.setProps({ isAuthenticated: true });
    // expect(
    //   wrapper.contains(<NavigationItem link='/orders'>Orders</NavigationItem>)
    // ).toHaveLength(1);
    expect(
      wrapper.contains(<NavigationItem link='/orders'>Orders</NavigationItem>)
    ).toEqual(true);
  });
});
