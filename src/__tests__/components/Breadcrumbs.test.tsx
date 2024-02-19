import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { StaticRouter } from "react-router-dom/server";

const breadcrumbsArr = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

test("it renders breadcrumbs if given an array of Breadcrumb objects", async () => {
  const breadcrumbs = render(
    <StaticRouter location="/">
      <Breadcrumbs breadcrumbs={breadcrumbsArr} />
    </StaticRouter>,
  );

  for (let i = 0; i < breadcrumbsArr.length; i++) {
    const el = breadcrumbs.getByTestId(`breadcrumbs-item-${i}`);
    expect(el.textContent).toBe(breadcrumbsArr[i].name);
  }
  breadcrumbs.unmount();
});

test("it renders the last element as plain Typography", async () => {
  const breadcrumbs = render(
    <StaticRouter location="/">
      <Breadcrumbs breadcrumbs={breadcrumbsArr} />
    </StaticRouter>,
  );

  const lastEl = breadcrumbs.getByTestId(
    `breadcrumbs-item-${breadcrumbsArr.length - 1}`,
  );
  expect(lastEl.tagName).toBe("P");
  expect(lastEl.textContent).toBe(
    breadcrumbsArr[breadcrumbsArr.length - 1].name,
  );

  breadcrumbs.unmount();
});

test("it does not render anything if no breadcrumbs are given", async () => {
  const breadcrumbs = render(
    <StaticRouter location="/">
      <Breadcrumbs breadcrumbs={[]} />
    </StaticRouter>,
  );

  expect(breadcrumbs.container.innerHTML).toBe("");
  breadcrumbs.unmount();
});
