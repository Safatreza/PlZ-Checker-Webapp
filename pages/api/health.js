/**
 * Health Check Endpoint
 * Provides application status and monitoring information
 */

export const config = {
  maxDuration: 10
};

export default function handler(req, res) {
  try {
    // Only allow GET and HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'plz-router',
      version: '1.0.1',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'production',
      nodeVersion: process.version,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      }
    };

    res.status(200).json(healthStatus);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      status: 'unhealthy',
      error: 'Service unavailable',
      timestamp: new Date().toISOString()
    });
  }
}
