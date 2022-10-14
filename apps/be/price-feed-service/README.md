# Price Feed Backend

[TODO]

### Prereq:
Node - 12.19.0

### Generate Migrations

- Remove volumes
```bash
docker-compose down -v
```

- Update .env file
```bash
DB_HOST=localhost
DB_PORT=5433
```

- Create migrations
```bash
npm run typeorm -- migration:generate -n setup_database
```

- Revert .env file
```bash
DB_HOST=postgres
DB_PORT=5432
```

## Setup

- Run the following command to set-up postgres and run migrations:

```sh
  make set-up-postgres
```

- Start dependencies:

```sh
  make start-dependencies
```

- Start Backend container:

```sh
  make start-backend
```

## Database

- Up postgres container
```bash
docker-compose exec postgres bash
```

- Sign the database
```bash
psql -U postgres
```

- Connect to database
```
\c instabit
```

## Testing

Create a user in database

```sql
INSERT INTO public.users (
      name
    , email
    , password
    , status
    , type
    , created_at
    , updated_at
    , last_login
) VALUES (
    'test',
    'test@carbon.ai',
    '$2a$08$F0yBVt5F2rOKJWMWJxz14uQH8o.EwCEAnnaNFeIQ9oXuRZhc8lSEu',
    true,
    'super_admin',
    now(),
    now(),
    now()
)
```

Get Token:

```bash
curl --location --request POST 'http://localhost:3334/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@carbon.ai",
    "password": "test123"
}'
```


# Price Feed Blockchain

## Module Design

Link: https://miro.com/app/board/uXjVOAtzzgA=/?moveToWidget=3458764523871200885&cot=14

## DEXes

### Coinbase

- API Base URL: `https://api.coinbase.com/v2`
- Endpoint: `/prices/:currency_pair/buy`
- Currency pair: `BTC-USD`, `ETH-USD`, `MATIC-USD`
- Sample CURL request:

```
curl https://api.coinbase.com/v2/prices/BTC-USD/buy \
  -H 'Authorization: Bearer abd90df5f27a7b170cd775abf89d632b350b7c1c9d53e08b340cd9832ce52c2c'
```

### CoinGecko

Crypto Details:

 | ID              | Symbol  | Name            |
 | :-------------: |:-------:| :--------------:|
 | bitcoin         | btc     | Bitcoin         |
 | ethereum        | eth     | Ethereum        |
 | matic-network   | matic   | Polygon         |
 | wrapped-bitcoin | wbtc    | Wrapped Bitcoin |
 | wmatic          | wmatic  | Wrapped Matic   |
 | usd-coin        | usdc    | USD Coin        |
 | tether          | usdt    | Tether          |
 | dai             | dai     | Dai             |

- API Endpoint: `https://api.coingecko.com/api/v3/coins/list`
- Sample CURL request:
```
curl -X 'GET' \                                               
  'https://api.coingecko.com/api/v3/coins/list' \
  -H 'accept: application/json'

```
- Price request
  * API Base URL: `https://api.coingecko.com/api/v3/`
  * Endpoint: simple/price?ids=ethereum&vs_currencies=usd'
  Sample CURL request:
  ```
  curl -X 'GET' \
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd' \
  -H 'accept: application/json'
  ```

### Nomics {Removed}
URL: `https://nomics.com/docs/#tag/Currencies-Ticker`

API: `d5bafde187965caf056a34382748afa7e2f0af8d`

### Crypto API
API Key: `c731701decf64c89ab0e5866c926002515db028b`


### Kraken
URL: `https://docs.kraken.com/rest/#operation/getTickerInformation`

### CoinCap
URL: `https://docs.coincap.io/#d4bac290-230a-48c6-a8eb-6804b2d137f3`

