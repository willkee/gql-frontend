import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation addUser(
		$name: String!
		$age: Int!
		$title: String!
		$companyId: Int!
	) {
		addUser(name: $name, age: $age, title: $title, companyId: $companyId) {
			id
			name
			age
			title
			companyId
		}
	}
`;
