import { gql } from "apollo-boost";
import { addItemToCart } from "../redux/cart/cart.utils";

export const typeDefs = gql`
  extend type item {
    quantity: Int
  }
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _arge, { cache }, _info) => {
      const { cartHidden } = cache.readyQuery({
        query: GET_CART_HIDDEN,
      });
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });
      return !cartHidden;
    },
    AddItemTocCart: (_root, { item }, { cache }, _info) => {
      const { cartItems } = cache.readyQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });
      return newCartItems;
    },
  },
};
