import { Card, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LinkNewTab } from "@/LinkNewTab";
import { isDev } from "~/iso/env";
import { sec } from "~/iso/numbers/timeMs";

export function PrismaCard(props: any) {
  const [isPrismaStudioStarted, setIsPrismaStudioStarted] = useState(false);
  useEffect(() => {
    if (isDev()) {
      async function checkPrismaStudioStatus() {
        fetch("/api/devTools/checkPrismaStudioStatus")
          .then(result => result.json())
          .then(result => {
            setIsPrismaStudioStarted(result.isPrismaStudioStarted);
          });
      }
      const intervalId = setInterval(checkPrismaStudioStatus, 3 * sec);
      checkPrismaStudioStatus();
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
          cover={
            <div style={{ padding: 20 }}>
              <Image
                alt="prisma studio"
                height={200}
                src="/tools/prisma.svg"
                width={400}
              />
            </div>
          }
          hoverable
        >
          <Card.Meta
            description={
              <>
                Requires to run <code>`yarn studio`</code> in separate shell
                (local only)
              </>
            }
            title="Launch Prisma Studio"
          />
        </Card>
      </PrismaLink>
    </Col>
  );
}
