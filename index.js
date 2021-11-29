// Dependencies
import dotenv from 'dotenv';
import debugSetup from 'debug';
import { io } from 'socket.io-client';
import { apiDomain } from './lib/config.js';
import { updateLights } from './lib/lights.js';

// Environment configuration
dotenv.config();

// Setup debug
const debug = debugSetup('lumiere:client');

// Connect socket
const socket = io(apiDomain);

// Connect
socket.on('connect', () => {
  debug(`Socket connect: ${socket.id}`);

  // Listen for events
  socket.on('lights', (data) => {
    debug(data);
    updateLights(data);
  });

  // Send initial request for lights
  socket.emit('lights:get');
});

// Disconnect
socket.on('disconnect', () => {
  debug('Socket disconnect');
});
