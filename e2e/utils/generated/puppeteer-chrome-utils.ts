import { ElementHandle, Page } from "puppeteer";

export async function waitForSelectors(
  selectors: string[][],
  frame: Page,
  timeout: number,
) {
  // console.log(selectors);
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

export async function waitForSelector(
  selector: string | string[],
  frame: Page,
  timeout: number,
) {
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
        await element.evaluateHandle((el: { shadowRoot: any }) =>
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

export async function waitForElement(
  step: { count: number; operator: string; selectors: string[][] },
  frame: Page,
  timeout: number,
) {
  const count = step.count || 1;
  const operator = step.operator || ">=";
  const comp: any = {
    "<=": (a: number, b: number) => a <= b,
    "==": (a: number, b: number) => a === b,
    ">=": (a: number, b: number) => a >= b,
  };
  const compFn = comp[operator];
  await waitForFunction(async () => {
    const elements = await querySelectorsAll(step.selectors, frame);
    return compFn(elements.length, count);
  }, timeout);
}

export async function querySelectorsAll(selectors: any, frame: any) {
  for (const selector of selectors) {
    const result = await querySelectorAll(selector, frame);
    if (result.length) {
      return result;
    }
  }
  return [];
}

export async function querySelectorAll(
  selector: string | string[],
  frame: Page,
) {
  if (selector instanceof Array) {
    let elements: ElementHandle[] = [];
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
          await el.evaluateHandle((el: { shadowRoot: any }) =>
            el.shadowRoot ? el.shadowRoot : el,
          )
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

export async function waitForFunction(
  fn: { (): Promise<any>; (): any },
  timeout: number | undefined,
) {
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
