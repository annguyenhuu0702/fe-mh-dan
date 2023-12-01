import { Col, Row } from "antd";
import React from "react";
import Sidebar from "../components/Sidebar";

export declare interface DefaultLayoutProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
}

export default function DefaultLayout(props: DefaultLayoutProps): JSX.Element {
  const { children } = props;

  return (
    <section className="dashboard-layout">
      <Row>
        <Col xl={4} md={4} className="w-full">
          <Sidebar />
        </Col>
        <Col xl={20} md={20}>
          <div>Code header vô đây</div>
          <div>{children}</div>
        </Col>
      </Row>
    </section>
  );
}
