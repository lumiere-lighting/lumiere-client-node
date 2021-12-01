// Dependencies
import dotenv from 'dotenv';

// Environment configuration
dotenv.config();

export const apiDomain = process.env.API_DOMAIN || 'https://api.lumiere.lighting';
export const pixelLength = parseInt(process.env.PIXEL_LENGTH || '100', 10);
export const dmaChannel = parseInt(process.env.DMA_CHANNEL || '10', 10);
export const gpioChannel = parseInt(process.env.GPIO_CHANNEL || '18', 10);
export const brightness = parseInt(process.env.BRIGHTNESS || '255', 10);
export const stripType = process.env.STRIP_TYPE || 'rgb';
export const frameRate = parseInt(process.env.FRAME_RATE || '30', 10);
export const maxSpread = parseInt(process.env.MAX_SPREAD || '5', 10);
