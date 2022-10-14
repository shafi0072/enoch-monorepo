module.exports = {
   "type": "mongodb",
   "url": process.env.MONGO_CONNECTION_URI,
   "entities": [
      "dist/db/entities/**/*.js"
   ],
   "migrations": [
      "dist/db/migrations/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/db/entities",
      "migrationsDir": "src/db/migrations"
    }
}