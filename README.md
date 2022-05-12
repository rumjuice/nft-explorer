# NFT Explorer

Explore the NFTs from Ethereum blockchain in a particular block range.  
This project is part of the [NFT Data Challenge](https://github.com/suparilabs/nft-data-challenge).

## What does it do?

1. Get block details from block `14348850` to `14348860`
   - Store block details in the database
2. Get transaction logs from the above block
   - Filter `Transfer` events topics
   - Filter only `ERC721` events (this includes both Mint and Transfer of NFT)
   - Insert filtered transaction logs to database
3. Get all Tri3es NFT (`0x5930DB0F73b9bCF40F42d72DABbFdd16249EC5Be`) from database
   - Print on the console
4. Run on Docker

## How to run it?

> Make sure you have **Docker** installed!

- On the root, run `docker compose up`
