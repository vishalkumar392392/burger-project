import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("should render 2 Navigation items", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("should render 3 NavigationItems", () => {
    // wrapper = shallow(<NavigationItems isAuthenticated={true} />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should rnder 3 NavigationItems", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      )
    ).toEqual(true);
  });
});
