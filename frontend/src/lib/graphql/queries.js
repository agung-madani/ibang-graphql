import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient('http://localhost:9000/graphql');

export async function getCars() {
   const query = gql`
      query {
         cars {
          id
          date
          model
          price
          company {
            id
            name
         }
         }
      }
   `;
   const { cars } = await client.request(query);
   return cars;
   }