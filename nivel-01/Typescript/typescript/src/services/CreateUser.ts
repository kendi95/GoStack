interface Tech {
	title: string;
	experience: number;
}

interface User {
	name?: string;
	email: string;
	password: string;
	techs: Array<String | Tech>;
}

export default function createUser({ name, email, password, techs }: User) {
	const user = {
		name,
		email,
		password,
		techs,
	};
	return user;
}
