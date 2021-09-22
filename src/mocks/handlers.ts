import { rest } from "msw";
import { customerUri } from "../constants";
import { fakeCategory } from "../fakeData/fakeData";
export const handlers = [
  rest.delete(`${customerUri}/products/:id`, (req, res, ctx) => {
    const { id } = req.params;

    if (id === "fail") {
      return res(ctx.status(400));
    } else {
      return res(ctx.status(200), ctx.json({ result: "success" }));
    }
  }),
  rest.delete(`${customerUri}/product-categories/:id`, (req, res, ctx) => {
    const { id } = req.params;

    if (id === "fail") {
      return res(ctx.status(400));
    } else {
      return res(ctx.status(200), ctx.json({ results: "success" }));
    }
  }),
  rest.get(`${customerUri}/product-categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ results: { data: [fakeCategory] } })
    );
  }),
];
