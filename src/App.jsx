import React from "react";
import { Breadcrumb, Button, Layout, Menu, Row, theme } from "antd";
import StepperHorizontal from "./components/stepper";
import "./App.css";
const { Content, Footer } = Layout;
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/reducers/themeSlice";

const App = () => {
  const dispatch = useDispatch();

  const onChangeUI = () => {
    dispatch(setTheme());
  };
  return (
    <Layout className="content">
      <Content className="layout-padding">
        <Row align={"middle"} justify={"end"}>
          <Button color="purple" variant="solid" onClick={onChangeUI}>
            Change UI
          </Button>
        </Row>
        <StepperHorizontal></StepperHorizontal>
      </Content>
    </Layout>
  );
};

export default App;
