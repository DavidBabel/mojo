import { Col, Row } from "antd";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  actions: ReactNode[];
  sticky?: boolean;
  title: ReactNode;
}

export function TitleWithActions({ title, actions, sticky }: Props) {
  const style: CSSProperties = sticky
    ? {
        backgroundColor: "#fff",
        bottom: 0,
        position: "sticky",
        top: 0,
        zIndex: 60000,
      }
    : {};
  return (
    <>
      <Row style={style}>
        <Col xl={8} xs={24}>
          {title}
        </Col>
        <Col xl={16} xs={24}>
          <Row gutter={[6, 6]} style={{ textAlign: "right" }}>
            {actions.map((component, index) => (
              <Col key={`xs-buttons-${index}`} lg={0} xs={24}>
                {component}
              </Col>
            ))}
            <Col lg={24} xs={0}>
              {actions.map((component, index) => (
                <span
                  key={`grouped-buttons-${index}`}
                  style={{ marginLeft: 10 }}
                >
                  {component}
                </span>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
