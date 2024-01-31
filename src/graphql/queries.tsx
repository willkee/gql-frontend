import { gql } from "@apollo/client";

export const GET_USERS = gql`
	query GetUsers {
		users {
			id
			name
			age
			title
			company {
				name
				ceo
			}
		}
	}
`;

export const DYNAMIC_USER_QUERY = gql`
	query GetDynamicUsers(
		$includeId: Boolean!
		$includeName: Boolean!
		$includeAge: Boolean!
		$includeTitle: Boolean!
		$includeCompany: Boolean!
		$includeCompanyName: Boolean!
		$includeCompanyCeo: Boolean!
	) {
		users {
			id @include(if: $includeId)
			name @include(if: $includeName)
			age @include(if: $includeAge)
			title @include(if: $includeTitle)
			company @include(if: $includeCompany) {
				name @include(if: $includeCompanyName)
				ceo @include(if: $includeCompanyCeo)
			}
		}
	}
`;
