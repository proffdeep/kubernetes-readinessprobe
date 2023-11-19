const express = require('express');
const axios = require('axios');
const os = require('os');

const app = express();
const port = 3000;

// Route to return the IPv4 address of the pod
app.get('/', (req, res) => {
  // Get the pod's IPv4 address
  const ipv4Address = getIPv4Address();
  res.send(`Pod's IPv4 Address: ${ipv4Address}`);
});

// Route to check the health based on the / route's status
app.get('/health', async (req, res) => {
  try {
    // Make a request to the / route
    const response = await axios.get('http://localhost:3000/');

    // Check if the response status is 200
    const isHealthy = response.status === 200;

    // Return true or false based on the health status
    res.send({ healthy: isHealthy });
  } catch (error) {
    // If there is an error, consider the service as unhealthy
    res.send({ healthy: false, error: error.message });
  }
});

// Function to get the pod's IPv4 address
function getIPv4Address() {
  const networkInterfaces = os.networkInterfaces();
  const interfaces = Object.values(networkInterfaces).flat();
  const ipv4Address = interfaces
    .filter((iface) => iface.family === 'IPv4' && !iface.internal)
    .map((iface) => iface.address)[0];

  return ipv4Address || 'N/A';
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
