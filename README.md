# Lumiere Client (NodeJS)

## Deplopyment

### Raspberry Pi

- `raspi-config`
  - Enable SSH
  - Unsure how to exactly make sure that the PWM pins are actually accessible? Enable SPI? Enable I2C?
  - Configure timezone
  - Netowrk is available on boot
- Install git: `sudo apt-get install git`
- Install Node:
  - `curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -`
  - `sudo apt install nodejs`
