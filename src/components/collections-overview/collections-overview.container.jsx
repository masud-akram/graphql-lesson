import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionsOverview from "./collections-overview.component";

const GET_COLLECTION = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;
const CollectionOverviewContainer = () => (
    <Query query = {GET_COLLECTION}>
    {
        ({loading,error,data}) => {
            console.log(data);
            if (loading) return 'Loading...';
            return <CollectionsOverview collections = {data.collections}/>
        }
    }
    </Query>
);

export default CollectionOverviewContainer;