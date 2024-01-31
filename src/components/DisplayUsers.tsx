import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

export default function DisplayUsers() {
	const { loading, error, data } = useQuery(GET_USERS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :{error.message}</p>;

	return data.users.map((user: any) => (
		<div key={user.id}>
			<ul>
				<li>{user.name}</li>
				<li>{user.age}</li>
				<li>{user.title}</li>
			</ul>
		</div>
	));
}
