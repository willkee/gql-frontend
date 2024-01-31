import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import { useState, useEffect } from "react";

export default function CreateUser() {
	const initialState = {
		name: "",
		age: 0,
		title: "",
		companyId: 1,
	};

	useEffect(() => {
		return () => setFormData(initialState);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [formData, setFormData] = useState(initialState);

	const [addUser, { loading, error }] = useMutation(ADD_USER, {
		refetchQueries: [{ query: GET_USERS }],
	});

	if (loading) return <p>Submitting...</p>;
	if (error) return <p>Submission Error :{error.message}</p>;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formData.name || !formData.age || !formData.title) {
			return alert("Please fill in all the fields.");
		}

		const res = await addUser({
			variables: {
				name: formData.name,
				age: formData.age,
				title: formData.title,
				companyId: formData.companyId,
			},
		});

		console.log(res.data.addUser);
		setFormData(initialState);
	};
	return (
		<form onSubmit={handleSubmit}>
			<h1>Create User</h1>
			<section className="fx">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					placeholder="Name"
					value={formData.name}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
				/>
			</section>
			<section className="fx">
				<label htmlFor="name">Age</label>
				<input
					type="number"
					placeholder="Age"
					value={formData.age}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							age: Number(e.target.value),
						}))
					}
				/>
			</section>
			<section className="fx">
				<label htmlFor="name">Title</label>
				<input
					type="text"
					placeholder="Title"
					value={formData.title}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
				/>
			</section>
			<button type="submit">Add User</button>
		</form>
	);
}
