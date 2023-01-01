import React, { useEffect, useState } from "react";
import {
	Admin,
	BooleanField,
	Datagrid,
	DataProvider,
	List,
	Resource,
	TextField,
} from "react-admin";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import pgDataProvider from "ra-postgraphile";
import config from "~/lib/api/config";

const client = new ApolloClient({
	uri: config.gqlURL,
	cache: new InMemoryCache(),
});

const CategoryList = (
	<List>
		<Datagrid>
			<TextField source="categoryName" />
			<TextField source="categoryDisplayName" />
			<BooleanField source="countsTowardsOverall" />
		</Datagrid>
	</List>
);

const SongList = (
	<List sort={{ field: "beatSaverKey", order: "DESC" }}>
		<Datagrid>
			<TextField source="beatSaverKey" label="BeatSaver Key" />
			<TextField source="songName" />
			<TextField source="songSubName" />
			<TextField source="songAuthorName" />
		</Datagrid>
	</List>
);

const App = () => {
	const [dataProvider, setDataProvider] = useState<DataProvider>();

	useEffect(() => {
		(async () => {
			const dataProvider = await pgDataProvider(client);
			setDataProvider(() => dataProvider);
		})();
	}, []);

	return (
		dataProvider && (
			<Admin dataProvider={dataProvider}>
				<Resource list={CategoryList} name='Categories' />
				<Resource list={SongList} name='Songs' />
			</Admin>
		)
	);
};

export default App;
