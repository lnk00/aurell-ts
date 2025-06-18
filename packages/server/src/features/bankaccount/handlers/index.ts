import { Hono } from "hono";
import { validator } from "hono/validator";
import z from "zod/v4";
import { getService } from "../../../libs/ioc.lib";
import { Validate } from "../../../libs/validator.lib";
import type { HonoContextType } from "../../../types/context.type";
import { guardMiddleware } from "../../auth/middlewares/guard.middleware";

const schema = z.object({
	bankAccountId: z.string("bankAccountId is required in the request body"),
});

const openbankingHandlers = new Hono<HonoContextType>()
	.use("*", guardMiddleware)
	.get("/link/code", async (c) => {
		const userId = c.get("userId");
		const obCoreService = getService("obcore");

		const { linkCode } = await obCoreService.getLinkCode(userId as string);

		return c.json(
			{
				code: linkCode,
			},
			200,
		);
	})
	.post(
		"/link/aggreg",
		validator("form", (value) => Validate(value, schema)),
		async (c) => {
			return c.json({
				success: true,
			});
		},
	)
	.get("/accounts", async (c) => {
		const userId = c.get("userId");
		const obAccountService = getService("obaccount");

		const accounts = await obAccountService.listAccounts(userId as string);

		return c.json({
			accounts,
		});
	});

export default openbankingHandlers;
