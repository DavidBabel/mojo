/**
 * @jest-environment puppeteer
 */

import { cleanUpDBUser } from "../utils/db-utils";
import { waitForSelectors } from "../utils/generated/puppeteer-chrome-utils";

jest.setTimeout(40000);

describe("Mojo auth workflow", () => {
  beforeAll(async () => {
    await cleanUpDBUser("test@test.io");
  });
  afterAll(async () => {
    await cleanUpDBUser("test@test.io");
  });

  it("should execute the auth workflow correctly", async () => {
    const timeout = 10000;

    {
      await page.setViewport({ height: 819, width: 1290 });
    }
    {
      const promises = [];
      promises.push(page.waitForNavigation());
      await page.goto("http://localhost:3000/");
      await Promise.all(promises);
    }
    {
      const element = await waitForSelectors(
        [
          ['aria/user-add Register[role="link"]'],
          [
            "#__next > section > section > header > div > button:nth-child(2) > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 50.09375, y: 11.5 } });
    }
    {
      const element = await waitForSelectors(
        [
          ['aria/Prefer sign-in[role="link"]'],
          [
            "#register > div:nth-child(4) > div > div > div > div > button:nth-child(1) > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 28.25, y: 15 } });
    }
    {
      const element = await waitForSelectors(
        [
          ['aria/Go to register[role="link"]'],
          [
            "#signin > div:nth-child(3) > div > div > div > div > button:nth-child(1) > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 53.25, y: 8 } });
    }
    {
      const element = await waitForSelectors(
        [["aria/User name :"], ["#register_name"]],
        page,
        timeout,
      );
      await element.click({ offset: { x: 114.25, y: 8.5 } });
    }
    {
      const element = await waitForSelectors(
        [["aria/User name :"], ["#register_name"]],
        page,
        timeout,
      );
      await element.click({ offset: { x: 132.25, y: 12.5 } });
    }
    {
      const element = await waitForSelectors(
        [["aria/User name :"], ["#register_name"]],
        page,
        timeout,
      );
      const type = await element.evaluate((el: any) => el.type);
      if (
        [
          "textarea",
          "select-one",
          "text",
          "url",
          "tel",
          "search",
          "password",
          "number",
          "email",
        ].includes(type)
      ) {
        await element.type("test@test.io");
      } else {
        await element.focus();
        await element.evaluate((el: any, value) => {
          el.value = value;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, "test@test.io");
      }
    }
    {
      await page.keyboard.down("Tab");
    }
    {
      await page.keyboard.up("Tab");
    }
    {
      const element = await waitForSelectors(
        [["aria/* Email address :"], ["#register_email"]],
        page,
        timeout,
      );
      const type = await element.evaluate((el: any) => el.type);
      if (
        [
          "textarea",
          "select-one",
          "text",
          "url",
          "tel",
          "search",
          "password",
          "number",
          "email",
        ].includes(type)
      ) {
        await element.type("test@test.io");
      } else {
        await element.focus();
        await element.evaluate((el: any, value) => {
          el.value = value;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, "test@test.io");
      }
    }
    {
      await page.keyboard.down("Tab");
    }
    {
      await page.keyboard.up("Tab");
    }
    {
      const element = await waitForSelectors(
        [["aria/* Password :"], ["#register_password"]],
        page,
        timeout,
      );
      const type = await element.evaluate((el: any) => el.type);
      if (
        [
          "textarea",
          "select-one",
          "text",
          "url",
          "tel",
          "search",
          "password",
          "number",
          "email",
        ].includes(type)
      ) {
        await element.type("test@test.io");
      } else {
        await element.focus();
        await element.evaluate((el: any, value) => {
          el.value = value;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, "test@test.io");
      }
    }
    {
      const element = await waitForSelectors(
        [
          ["aria/Register with Credentials"],
          [
            "#register > div:nth-child(4) > div > div > div > div > button.ant-btn.ant-btn-primary > span",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 46.5859375, y: 5.5 } });
    }
    {
      const element = await waitForSelectors(
        [
          ['aria/user-add Signin[role="link"]'],
          [
            "#__next > section > section > main > div.site-layout-background > div > div.ant-col.ant-col-xs-24.ant-col-xl-8.ant-col-xl-offset-8 > button > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 151.671875, y: 41.90625 } });
    }
    {
      const element = await waitForSelectors(
        [["aria/Email address :"], ["#signin_email"]],
        page,
        timeout,
      );
      await element.click({ offset: { x: 95.25, y: 13.5 } });
    }
    {
      const element = await waitForSelectors(
        [["aria/Email address :"], ["#signin_email"]],
        page,
        timeout,
      );
      const type = await element.evaluate((el: any) => el.type);
      if (
        [
          "textarea",
          "select-one",
          "text",
          "url",
          "tel",
          "search",
          "password",
          "number",
          "email",
        ].includes(type)
      ) {
        await element.type("test@test.io");
      } else {
        await element.focus();
        await element.evaluate((el: any, value) => {
          el.value = value;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, "test@test.io");
      }
    }
    {
      await page.keyboard.down("Tab");
    }
    {
      await page.keyboard.up("Tab");
    }
    {
      const element = await waitForSelectors(
        [["aria/Password :"], ["#signin_password"]],
        page,
        timeout,
      );
      const type = await element.evaluate((el: any) => el.type);
      if (
        [
          "textarea",
          "select-one",
          "text",
          "url",
          "tel",
          "search",
          "password",
          "number",
          "email",
        ].includes(type)
      ) {
        await element.type("test@test.io");
      } else {
        await element.focus();
        await element.evaluate((el: any, value) => {
          el.value = value;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, "test@test.io");
      }
    }
    {
      const promises = [];
      promises.push(page.waitForNavigation());
      const element = await waitForSelectors(
        [
          ["aria/Sign-in with Credentials"],
          [
            "#signin > div:nth-child(3) > div > div > div > div > button.ant-btn.ant-btn-primary > span",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 56.8125, y: 9.5 } });
      await Promise.all(promises);
    }
    {
      const element = await waitForSelectors(
        [
          ['aria/video-camera Look at your videos[role="link"]'],
          [
            "#__next > section > section > main > div.site-layout-background > div > div.ant-col.ant-col-xs-24.ant-col-xl-8.ant-col-xl-offset-4 > button > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 175.8359375, y: 37.90625 } });
    }
    {
      const promises = [];
      promises.push(page.waitForNavigation());
      const element = await waitForSelectors(
        [
          ["aria/user-delete Sign out"],
          ["#__next > section > section > header > div > button > span"],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 39.1328125, y: 7 } });
      await Promise.all(promises);
    }
    {
      const element = await waitForSelectors(
        [
          ["aria/< Demo Tools />"],
          [
            "#__next > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-active > span.ant-menu-title-content > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 24, y: 4.5 } });
    }
    {
      const element = await waitForSelectors(
        [
          ["aria/setting"],
          [
            "#__next > section > section > main > div.site-layout-background > div > div:nth-child(1) > div > div.ant-card-cover > div > span",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 106, y: 85.5 } });
    }
    {
      const promises = [];
      promises.push(page.waitForNavigation());
      const element = await waitForSelectors(
        [
          ["aria/Sign-in with Credentials"],
          [
            "#signin > div:nth-child(3) > div > div > div > div > button.ant-btn.ant-btn-primary > span",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 90.8125, y: 16.5 } });
      await Promise.all(promises);
    }
    {
      const element = await waitForSelectors(
        [
          ["aria/Users"],
          [
            "#__next > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-active > span.ant-menu-title-content > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 44, y: 10.5 } });
    }

    {
      const element = await waitForSelectors(
        [
          ["aria/< Demo Tools />"],
          [
            "#__next > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-active > span.ant-menu-title-content > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 45, y: 3.5 } });
    }
    {
      const element = await waitForSelectors(
        [
          ['aria/[role="main"]', "aria/user"],
          [
            "#__next > section > section > main > div.site-layout-background > div > div:nth-child(2) > div > div.ant-card-cover > div > span",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 62.75, y: 100.5 } });
    }
    {
      const promises = [];
      promises.push(page.waitForNavigation());
      const element = await waitForSelectors(
        [
          ["aria/Sign-in with Credentials", 'aria/[role="generic"]'],
          [
            "#signin > div:nth-child(3) > div > div > div > div > button.ant-btn.ant-btn-primary > span",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 29.8125, y: 3.5 } });
      await Promise.all(promises);
    }
    {
      const element = await waitForSelectors(
        [
          ["aria/My Videos"],
          [
            "#__next > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-active > span.ant-menu-title-content > a",
          ],
        ],
        page,
        timeout,
      );
      await element.click({ offset: { x: 47, y: 10.5 } });
    }
  });
});
