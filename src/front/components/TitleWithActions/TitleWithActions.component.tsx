import { Col, Row } from "antd";
import type { ReactNode } from "react";

import { cn } from "~/front/lib/classnames.exports";

interface Props {
  actions: ReactNode[];
  sticky?: boolean;
  title: ReactNode;
}

export function TitleWithActions({ title, actions, sticky }: Props) {
  return (
    <>
      <Row
        className={cn({ sticky })}
        style={{ backgroundColor: "white", paddingBottom: 8 }}
      >
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
