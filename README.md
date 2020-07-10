# archival-bot

This bot was made to archive messages.

### Installation

1. `npm i`
2. Copy `config.example.json` to `config.json` and fill out the values.
3. `node .`
4. Enjoy.

### Configuration

```json
{
    "discord": {
        "token": "discord_bot_token"
    },
    "channels": [
        "IDs of channels",
        "to listen for messages in"
    ],
    "log": "ID of channel to archive messages in"
}
```
