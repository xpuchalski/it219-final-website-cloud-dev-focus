import { getSystemHealth, services, getMetrics, deployments, logs, simulateDeploymentAction } from './data/state.js';

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Health endpoint
    if (path === '/api/health' && method === 'GET') {
      const health = getSystemHealth();
      return new Response(JSON.stringify(health), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Services endpoint
    if (path === '/api/services' && method === 'GET') {
      return new Response(JSON.stringify(services), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Services metrics endpoint
    if (path === '/api/services/metrics' && method === 'GET') {
      const metrics = getMetrics();
      return new Response(JSON.stringify(metrics), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Deployments list endpoint
    if (path === '/api/deployments' && method === 'GET') {
      return new Response(JSON.stringify(deployments), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Deploy endpoint
    if (path === '/api/deployments/deploy' && method === 'POST') {
      const body = await request.json();
      const { service } = body;

      if (!service) {
        return new Response(
          JSON.stringify({ success: false, message: 'Service name is required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      try {
        const updated = simulateDeploymentAction(service, 'Deploy');
        return new Response(
          JSON.stringify({ success: true, message: `${updated.name} deployment completed.`, service: updated }),
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ success: false, message: error.message }),
          { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
    }

    // Restart endpoint
    if (path === '/api/deployments/restart' && method === 'POST') {
      const body = await request.json();
      const { service } = body;

      if (!service) {
        return new Response(
          JSON.stringify({ success: false, message: 'Service name is required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      try {
        const updated = simulateDeploymentAction(service, 'Restart');
        return new Response(
          JSON.stringify({ success: true, message: `${updated.name} restarted successfully.`, service: updated }),
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ success: false, message: error.message }),
          { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
    }

    // Rollback endpoint
    if (path === '/api/deployments/rollback' && method === 'POST') {
      const body = await request.json();
      const { service } = body;

      if (!service) {
        return new Response(
          JSON.stringify({ success: false, message: 'Service name is required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      try {
        const updated = simulateDeploymentAction(service, 'Rollback');
        return new Response(
          JSON.stringify({ success: true, message: `${updated.name} rollback completed.`, service: updated }),
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ success: false, message: error.message }),
          { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
    }

    // Logs endpoint
    if (path === '/api/logs' && method === 'GET') {
      return new Response(JSON.stringify(logs), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // 404 for unmatched routes
    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}

export default { fetch: handleRequest };
