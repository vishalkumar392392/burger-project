import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onAddIngredients={() => {}} />);
  });
  it("should render <BuildControls/> while receiving ingredients", () => {
    wrapper.setProps({ ingre: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
