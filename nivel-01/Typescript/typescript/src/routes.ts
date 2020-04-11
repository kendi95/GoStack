import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function hellhoWorld(req: Request, res: Response) {
	const user = createUser({
		name: "Alisson",
		email: "alisson@mail.com",
		password: "123465",
		techs: [
			"Node.js",
			"React Native",
			{
				title: "Javascript",
				experience: 100,
			},
		],
	});
	return res.status(200).json(user);
}
