/* eslint-disable */
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  async function waitForSelectors(selectors, frame, timeout) {
    for (const selector of selectors) {
      try {
        return await waitForSelector(selector, frame, timeout);
      } catch (err) {
        console.error(err);
      }
    }
    throw new Error(
      "Could not find element for selectors: " + JSON.stringify(selectors),
    );
  }

  async function waitForSelector(selector, frame, timeout) {
    if (selector instanceof Array) {
      let element = null;
      for (const part of selector) {
        if (!element) {
          element = await frame.waitForSelector(part, { timeout });
        } else {
          element = await element.$(part);
        }
        if (!element) {
          throw new Error("Could not find element: " + part);
        }
        element = (
          await element.evaluateHandle(el =>
            el.shadowRoot ? el.shadowRoot : el,
          )
        ).asElement();
      }
      if (!element) {
        throw new Error("Could not find element: " + selector.join("|"));
      }
      return element;
    }
    const element = await frame.waitForSelector(selector, { timeout });
    if (!element) {
      throw new Error("Could not find element: " + selector);
    }
    return element;
  }

  async function waitForElement(step, frame, timeout) {
    const count = step.count || 1;
    const operator = step.operator || ">=";
    const comp = {
      "<=": (a, b) => a <= b,
      "==": (a, b) => a === b,
      ">=": (a, b) => a >= b,
    };
    const compFn = comp[operator];
    await waitForFunction(async () => {
      const elements = await querySelectorsAll(step.selectors, frame);
      return compFn(elements.length, count);
    }, timeout);
  }

  async function querySelectorsAll(selectors, frame) {
    for (const selector of selectors) {
      const result = await querySelectorAll(selector, frame);
      if (result.length) {
        return result;
      }
    }
    return [];
  }

  async function querySelectorAll(selector, frame) {
    if (selector instanceof Array) {
      let elements = [];
      let i = 0;
      for (const part of selector) {
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        const tmpElements = [];
        for (const el of elements) {
          const newEl = (
            await el.evaluateHandle(el => (el.shadowRoot ? el.shadowRoot : el))
          ).asElement();
          if (newEl) {
            tmpElements.push(newEl);
          }
        }
        elements = tmpElements;
        i++;
      }
      return elements;
    }
    const element = await frame.$$(selector);
    if (!element) {
      throw new Error("Could not find element: " + selector);
    }
    return element;
  }

  async function waitForFunction(fn, timeout) {
    let isActive = true;
    setTimeout(() => {
      isActive = false;
    }, timeout);
    while (isActive) {
      const result = await fn();
      if (result) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error("Timed out");
  }
  {
    const targetPage = page;
    await targetPage.setViewport({ height: 819, width: 1290 });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    await targetPage.goto("chrome://newtab/");
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/user-add Register[role="link"]'],
        [
          "#__next > section > section > header > div > button:nth-child(2) > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 50.09375, y: 11.5 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/Prefer sign-in[role="link"]'],
        [
          "#register > div:nth-child(4) > div > div > div > div > button:nth-child(1) > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 28.25, y: 15 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/Go to register[role="link"]'],
        [
          "#signin > div:nth-child(3) > div > div > div > div > button:nth-child(1) > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 53.25, y: 8 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["aria/User name :"], ["#register_name"]],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 114.25, y: 8.5 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["aria/User name :"], ["#register_name"]],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 132.25, y: 12.5 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["aria/User name :"], ["#register_name"]],
      targetPage,
      timeout,
    );
    const type = await element.evaluate(el => el.type);
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
      await element.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }, "test@test.io");
    }
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Tab");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Tab");
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["aria/* Email address :"], ["#register_email"]],
      targetPage,
      timeout,
    );
    const type = await element.evaluate(el => el.type);
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
      await element.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }, "test@test.io");
    }
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Tab");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Tab");
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["aria/* Password :"], ["#register_password"]],
      targetPage,
      timeout,
    );
    const type = await element.evaluate(el => el.type);
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
      await element.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }, "test@test.io");
    }
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ["aria/Register with Credentials", 'aria/[role="generic"]'],
        [
          "#register > div:nth-child(4) > div > div > div > div > button.ant-btn.ant-btn-primary > span",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 46.5859375, y: 5.5 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/user-add Signin[role="link"]'],
        [
          "#__next > section > section > main > div.site-layout-background > div > div.ant-col.ant-col-xs-24.ant-col-xl-8.ant-col-xl-offset-8 > button > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 151.671875, y: 41.90625 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["aria/Email address :"], ["#signin_email"]],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 95.25, y: 13.5 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["aria/Email address :"], ["#signin_email"]],
      targetPage,
      timeout,
    );
    const type = await element.evaluate(el => el.type);
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
      await element.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }, "test@test.io");
    }
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Tab");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Tab");
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["aria/Password :"], ["#signin_password"]],
      targetPage,
      timeout,
    );
    const type = await element.evaluate(el => el.type);
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
      await element.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }, "test@test.io");
    }
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [
        ["aria/Sign-in with Credentials", 'aria/[role="generic"]'],
        [
          "#signin > div:nth-child(3) > div > div > div > div > button.ant-btn.ant-btn-primary > span",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 56.8125, y: 9.5 } });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/video-camera Look at your videos[role="link"]'],
        [
          "#__next > section > section > main > div.site-layout-background > div > div.ant-col.ant-col-xs-24.ant-col-xl-8.ant-col-xl-offset-4 > button > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 175.8359375, y: 37.90625 } });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [
        ["aria/user-delete Sign out", 'aria/[role="generic"]'],
        ["#__next > section > section > header > div > button > span"],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 39.1328125, y: 7 } });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ["aria/< Demo Tools />"],
        [
          "#__next > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-active > span.ant-menu-title-content > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 24, y: 4.5 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ["aria/setting"],
        [
          "#__next > section > section > main > div.site-layout-background > div > div:nth-child(1) > div > div.ant-card-cover > div > span",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 106, y: 85.5 } });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [
        ["aria/Sign-in with Credentials", 'aria/[role="generic"]'],
        [
          "#signin > div:nth-child(3) > div > div > div > div > button.ant-btn.ant-btn-primary > span",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 90.8125, y: 16.5 } });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ["aria/Users"],
        [
          "#__next > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-active > span.ant-menu-title-content > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 44, y: 10.5 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          "#__next > section > section > main > div.site-layout-background > div > div > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(5) > button > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 76.359375, y: 13 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ["aria/< Demo Tools />"],
        [
          "#__next > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-active > span.ant-menu-title-content > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 45, y: 3.5 } });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/[role="main"]', "aria/user"],
        [
          "#__next > section > section > main > div.site-layout-background > div > div:nth-child(2) > div > div.ant-card-cover > div > span",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 62.75, y: 100.5 } });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [
        ["aria/Sign-in with Credentials", 'aria/[role="generic"]'],
        [
          "#signin > div:nth-child(3) > div > div > div > div > button.ant-btn.ant-btn-primary > span",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 29.8125, y: 3.5 } });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ["aria/My Videos"],
        [
          "#__next > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-active > span.ant-menu-title-content > a",
        ],
      ],
      targetPage,
      timeout,
    );
    await element.click({ offset: { x: 47, y: 10.5 } });
  }

  await browser.close();
})();
