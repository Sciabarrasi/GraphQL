import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import crypto from "crypto";

const schema = buildSchema(`
  type Prod {
    id: ID!
    title : String!
    price : Int!
    category : String!
    thumbnail : String!
  }
  input ProdInput {
    title : String
    price : Int
    category : String
    thumbnail : String
  }
  type Query {
    getProd(id: ID!): Prod,
    getProds(field: String, value: String): [Prod],
  }
  type Mutation {
    createProd(data: ProdInput): Prod
    updateProd(id: ID!, data: ProdInput): Prod
    deleteProd(id: ID!): Prod
  }
`);

const app = express();

// app.use(express.static("public"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProds,
      getProd,
      createProd,
      updateProd,
      deleteProd,
    },
    graphiql: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  const msg = `Servidor corriendo en puerto: ${PORT}`;
  console.log(msg);
});

class Prod {
  constructor(id, { title, price, category, thumbnail }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.thumbnail = thumbnail;
  }
}

const prodsMap = {};

function getProds({ field, value }) {
  const prods = Object.values(prodsMap);
  if (field && value) {
    return prods.filter((p) => p[field] == value);
  } else {
    return prods;
  }
}

function getProd({ id }) {
  if (!prodsMap[id]) {
    throw new Error("Prod not found.");
  }
  return prodsMap[id];
}

function createProd({ data }) {
  const id = crypto.randomBytes(10).toString("hex");
  const nuevaProd = new Prod(id, data);
  prodsMap[id] = nuevaProd;
  return nuevaProd;
}

function updateProd({ id, data }) {
  if (!prodsMap[id]) {
    throw new Error("Prod not found");
  }
  const prodActualizada = new Prod(id, data);
  prodsMap[id] = prodActualizada;
  return prodActualizada;
}

function deleteProd({ id }) {
  if (!prodsMap[id]) {
    throw new Error("Prod not found");
  }
  const prodBorrada = prodsMap[id];
  delete prodsMap[id];
  return prodBorrada;
}
