import { useQuery } from "@apollo/client";
import { useState } from "react";

import { DYNAMIC_USER_QUERY } from "../graphql/queries";

export default function DynamicUserQuery() {
	type SelectedFields = {
		includeId: boolean;
		includeName: boolean;
		includeAge: boolean;
		includeTitle: boolean;
		includeCompany: boolean;
		includeCompanyName: boolean;
		includeCompanyCeo: boolean;
	};

	type User = {
		id?: string;
		name?: string;
		age?: number;
		title?: string;
		company?: {
			name?: string;
			ceo?: string;
		};
	};

	const checkboxLabel = {
		includeId: "ID",
		includeName: "Name",
		includeAge: "Age",
		includeTitle: "Title",
		includeCompany: "Company",
		includeCompanyName: "Company Name",
		includeCompanyCeo: "Company CEO",
	};

	const [selectedFields, setSelectedFields] = useState<SelectedFields>({
		includeId: true,
		includeName: true,
		includeAge: true,
		includeTitle: true,
		includeCompany: true,
		includeCompanyName: true,
		includeCompanyCeo: true,
	});

	const { data, loading, error } = useQuery(DYNAMIC_USER_QUERY, {
		variables: selectedFields,
	});

	const handleCheckboxChange = (field: keyof SelectedFields) => {
		setSelectedFields((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :{error.message}</p>;

	return (
		<div>
			<div>
				{Object.keys(selectedFields).map((key) => (
					<label key={key}>
						<input
							type="checkbox"
							checked={
								selectedFields[key as keyof SelectedFields]
							}
							onChange={() =>
								handleCheckboxChange(
									key as keyof SelectedFields
								)
							}
							disabled={key === "includeId"}
						/>
						{checkboxLabel[key as keyof SelectedFields]}
					</label>
				))}
			</div>{" "}
			<div>
				{data &&
					data.users.map((user: User, i: number) => (
						<ul key={i}>
							{user.id && <li>ID: {user.id}</li>}
							{user.name && <li>Name: {user.name}</li>}
							{user.age && <li>Age: {user.age}</li>}
							{user.title && <li>Title: {user.title}</li>}
							{user.company && (
								<ul>
									{user.company.name && (
										<li>
											Company Name: {user.company.name}
										</li>
									)}
									{user.company.ceo && (
										<li>Company CEO: {user.company.ceo}</li>
									)}
								</ul>
							)}
						</ul>
					))}
			</div>
		</div>
	);
}
