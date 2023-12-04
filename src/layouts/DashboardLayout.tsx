import React from "react";
import { Row, Col } from "antd";
import classNames from "classnames";
import "./defaultLayout.scss";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export declare interface DefaultLayoutProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
}

export default function DefaultLayout(props: DefaultLayoutProps): JSX.Element {
  const { children, className } = props;

  return (
    <React.Fragment>
      <div className={classNames("rs-layout", className)}>
        <Row>
          <Col xl={4} md={4}>
            <Sidebar />
          </Col>
          <Col xl={20} md={20} className="rs-layout-content">
            <Row className="rs-layout-row">
              <div className="rs-layout-header">
                <Header />
              </div>
              <div className="rs-layout-children">{children}</div>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}
