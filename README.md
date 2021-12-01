# Lumiere Client (NodeJS)


## Usage

Run the client with: `node ./index.js`

## Configuration

The following are environment variables for configuration.  A `.env` file can be used as well.

- `API_DOMAIN`: The location of the Lumiere API, should be something like this (no trailing slash): `https://api.lumiere.lighting`
- `PIXEL_LENGTH`: Number of LEDs that the client is connected to.
- `DMA_CHANNEL`: Defaults to `10`
- `GPIO_CHANNEL`: Defaults to `18`
- `BRIGHTNESS`: Brightness of LEDs (`0`-`255`); defaults to `255`.
- `STRIP_TYPE`: LED light configuration.  Can be `rgb`, `grb`, etc; defaults to `rgb`.
- `DEBUG`: What to debug; to get just the lumiere output, use `lumiere:*`
- `FRAME_RATE`: The frame rate of animations in frames per second.  Defaults to `30`.
- `MAX_SPREAD`: When displaying pixels, the spread is the amount of repeating of a color.  Should be 1 or great; defaults to `5`.

## Deplopyment

### Raspberry Pi

Initial configuartion of the Raspberry Pi.

- `raspi-config`
  - Enable SSH
  - Unsure how to exactly make sure that the PWM pins are actually accessible? Enable SPI? Enable I2C?
  - Configure timezone
  - Make sure network is available on boot
  - Make sure it can connect to the internet.

Install depdendencies.

- Install git: `sudo apt-get install git`
- Install Node:
  - `curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -`
  - `sudo apt install nodejs`

Install the startup/service script.

- Copy the `init.d` script with something like:
   - `sudo cp ./deploy/lumiere-client.init.d /etc/init.d/lumiere-client`
- Update the script as needed.  Mostly this will just be updating the `APP_DIR` variable.
- Install to be able to be run on startup.
   - `sudo update-rc.d lumiere-client defaults`