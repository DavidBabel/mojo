import { Card, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { LinkNewTab } from "@/LinkNewTab";
import { isDev } from "~/iso/env";
import { sec } from "~/iso/numbers/timeMs";

export function PrismaCard(props: any) {
  const [isPrismaStudioStarted, setIsPrismaStudioStarted] = useState(false);
  useEffect(() => {
    if (isDev()) {
      const intervalId = setInterval(async () => {
        fetch("/api/devTools/checkPrismaStudioStatus")
          .then(result => result.json())
          .then(result => {
            setIsPrismaStudioStarted(result.isPrismaStudioStarted);
          });
      }, 3 * sec);
      return () => clearInterval(intervalId);
    }
  }, []);

  const PrismaLink = isPrismaStudioStarted ? LinkNewTab : Link;

  return (
    <Col
      {...props}
      style={{ ...props.style, opacity: isPrismaStudioStarted ? 1 : 0.35 }}
    >
      <PrismaLink
        href={isPrismaStudioStarted ? "http://localhost:5555" : "/tools"}
      >
        <Card
          hoverable
          cover={
            <div style={{ padding: 20 }}>
              <Image
                width={400}
                height={200}
                alt="prisma studio"
                src="/tools/prisma.svg"
              />
            </div>
          }
        >
          <Card.Meta
            title="Launch Prisma Studio"
            description={
              <>
                Requires to run <code>`yarn studio`</code> in separate shell
                (local only)
              </>
            }
          />
        </Card>
      </PrismaLink>
    </Col>
  );
}
