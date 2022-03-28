/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "pg",
    connection: {
      host: "db",
      user: "postgres",
      password: "nft",
      database: "nft_data",
      charset: "utf8",
    },
  },
};
