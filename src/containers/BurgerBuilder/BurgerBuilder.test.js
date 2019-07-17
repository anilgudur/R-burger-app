import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import React from "react";

import { BurgerBuilder } from "./BurgerBuilder";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder oninitIngredientsAction={() => {}} />);
  });

  it("it should render <BurgerControls /> when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BurgerControls)).toHaveLength(1);
  });
});
