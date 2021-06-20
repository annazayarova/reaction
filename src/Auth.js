import React, { useEffect, useState } from "react";
import db from './config/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
//	const [pending, setPending] = useState(true);

	useEffect(() => {
		db.auth().onAuthStateChanged((user) => {
			setCurrentUser(user);
//			setPending(false)
		});
	}, [ ]);

/*	if (pending) {
		return <Text>Loading...</Text>
	}
*/
	return (
		<AuthContext.Provider
			value={{
				currentUser
			}}
		>
			{ children }
		</AuthContext.Provider>
	);
};
