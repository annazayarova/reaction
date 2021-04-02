import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import Categories from '../components/Categories';
import db from '../services/firebase';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderOfUser from '../components/HeaderOfUser';
import Navigation from '../components/Navigation';
import NotFound from '../components/common/NotFound';
import Skeleton from '../components/common/Loadings/Skeleton';
import { AuthContext } from '../Auth';

const Tenant = ({
    theme,
    themeToggled,
	onToggleTheme
}) => {

	const [ businessName, setBusinessName ] = useState('');
	const [ categories, setCategories ] = useState([]);
	const [ items, setItems ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ notFound, setNotFound ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	const { currentUser } = useContext(AuthContext);

	let location = useLocation();
	const url = location.pathname;
	const idFromUrl = url.slice(1);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchReset = () => {
		setSearchTerm('');
	};

	const docRef = db.firestore().collection("users").doc(idFromUrl);

	useEffect(() => {
		docRef
		.collection('categories')
		.orderBy('timestamp', 'asc')
		.onSnapshot(snapshot => {
			setLoading(false);
			setCategories(snapshot.docs.map(doc => ({
				hidden: doc.data().hidden,
				id: doc.id,
				name: doc.data().name
			}) ))
		})

		docRef
		.collection('items')
		.orderBy('timestamp', 'asc')
		.onSnapshot(snapshot => {
				setLoading(false);
				setItems(snapshot.docs.map(doc => ({
					categoryId:  doc.data().categoryId,
					description:  doc.data().description,
					hidden: doc.data().hidden,
					id: doc.id,
					name: doc.data().name,
					price:  doc.data().price,
					vegan: doc.data().vegan
				}) ))
		})

		docRef.get().then((doc) => {
			if (doc.exists) {
				setBusinessName(doc.data().displayName);
			} else {
				setNotFound(true);
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}, []);

	const searchItems = !searchTerm
		? items
		: items.filter(item =>
			item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
			|| item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
		);

	return (
		<Root user={ currentUser && currentUser.uid === idFromUrl }>
			<Wrap>
				<HeaderOfUser userId={ idFromUrl }
					categories={ categories }
					businessName={ businessName }
				/>

				<Header businessName={ businessName }
					theme={ theme }
					onToggleTheme={ onToggleTheme }
					themeToggled={ themeToggled }
					userId={ idFromUrl }
					searchValue={ searchTerm }
				/>

				{ loading ? <Skeleton /> :
					<>
						<Navigation categories={ categories }
							invisible={ searchTerm }
							userId={ idFromUrl }
							onSearchChange={ handleSearchChange }
							searchValue={ searchTerm }
							resetSearch={ handleSearchReset }
						/>

						{ searchTerm.length > 0 && !searchItems.length > 0 && (
							<NotFound text="Try searching by item's name or description"
								title="No results found"
							/>
						) }

						<Categories categories={ categories }
							items={ searchItems }
							invisible={ searchTerm }
							userId={ idFromUrl }
						/>
					</>
				}
			</Wrap>

			<Footer />
		</Root>
    );
}

export default Tenant;

const Root = styled.div`
	position: relative;
	min-height: ${ ({ user }) =>  user ? 'calc(100vh - 64px)' : 0 };
	top: ${ ({ user }) =>  user ? '64px' : 0 };
`;

const Wrap = styled.div`
	padding-bottom: 64px;
`;
