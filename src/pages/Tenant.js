import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import Categories from '../components/Categories';
import db from '../services/firebase';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderOfUser from '../components/HeaderOfUser';
import Navigation from '../components/Navigation';
import NotFound from '../components/common/NotFound';

const Tenant = ({
    theme,
    themeToggled,
	onToggleTheme
}) => {

	const [ displayName, setDisplayName ] = useState('');
	const [ categories, setCategories ] = useState([]);
	const [ items, setItems ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');

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
		docRef.get().then(doc => {
			if (doc.exists) {
				setDisplayName(doc.data().displayName);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});

		docRef
		.collection('categories')
		.orderBy('timestamp', 'asc')
		.onSnapshot(snapshot => {
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
			setItems(snapshot.docs.map(doc => ({
				categoryId:  doc.data().categoryId,
				description:  doc.data().description,
				hidden: doc.data().hidden,
				id: doc.id,
				name: doc.data().name,
				price:  doc.data().price
			}) ))
		})
	}, []);

	const searchItems = !searchTerm
		? items
		: items.filter(item =>
			item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
			|| item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
		);

	const refs = categories.reduce((acc, value) => {
		acc[value.id] = React.createRef();
		return acc;
	}, {});

	const handleNavigationClick = id =>
    refs[id].current.scrollIntoView({
      	behavior: 'smooth',
      	block: 'start',
    });

    return (
        <Root>
			<Wrap>
				<HeaderOfUser userId={ idFromUrl }
					categories={ categories }
				/>

				<Header displayName={ displayName }
					theme={ theme }
					onToggleTheme={ onToggleTheme }
                    themeToggled={ themeToggled }
					onSearchChange={ handleSearchChange }
					searchValue={ searchTerm }
					resetSearch={ handleSearchReset }
					userId={ idFromUrl }
				/>

				<Navigation categories={ categories }
					invisible={ searchTerm }
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
			</Wrap>

			<Footer />
		</Root>
    );
}

export default Tenant;

const Root = styled.div`
	position: relative;
	min-height: 100vh;
`;

const Wrap = styled.div`
	padding-bottom: 64px;
`;
