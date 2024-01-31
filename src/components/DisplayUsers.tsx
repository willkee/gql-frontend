import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

export default function DisplayUsers() {
	const { loading, error, data } = useQuery(GET_USERS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :{error.message}</p>;
	console.log(data.users);
	return data.users.map((user: any) => (
		<div key={user.id}>
			<ul>
				<li>{user.name}</li>
				<ul>
					<li>Age: {user.age}</li>
					<li>Position: {user.title}</li>
					<li>Company:</li>
					<ul>
						<li>Name: {user.company.name}</li>
						<li>CEO: {user.company.ceo}</li>
					</ul>
				</ul>
			</ul>
		</div>
	));
}
