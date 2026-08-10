import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { lead_id } = body;
    if (!lead_id) return Response.json({ error: "lead_id required" }, { status: 400 });

    const lead = await base44.asServiceRole.entities.Lead.get(lead_id);
    if (!lead) return Response.json({ error: "Lead not found" }, { status: 404 });
    if (!lead.email) return Response.json({ error: "Lead has no email" }, { status: 400 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("hubspot");
    const headers = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    // 1. Create or find the contact by email
    let contactId = null;
    const contactRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        properties: {
          email: lead.email,
          firstname: lead.first_name || "",
          lastname: lead.last_name || "",
          phone: lead.phone || "",
          address: lead.address || "",
          city: lead.city || "",
          state: lead.state || "",
          zip: lead.zip || "",
          lifecyclestage: "lead",
        },
      }),
    });
    const contact = await contactRes.json();
    if (contactRes.ok) {
      contactId = contact.id;
    } else {
      // Contact may already exist — search by email
      const search = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
        method: "POST",
        headers,
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: lead.email }] }],
          properties: ["email", "firstname", "lastname"],
          limit: 1,
        }),
      });
      const sData = await search.json();
      contactId = sData.results?.[0]?.id || null;
    }

    // 2. Create a deal linked to the contact
    const dealName = `Garage Floor — ${lead.first_name || ""} ${lead.last_name || ""}`.trim();
    const dealRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
      method: "POST",
      headers,
      body: JSON.stringify({
        properties: {
          dealname: dealName,
          amount: String(lead.estimate_mid || 0),
          dealstage: "appointmentscheduled",
          pipeline: "default",
        },
        associations: contactId
          ? [{ to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }] }]
          : undefined,
      }),
    });
    const deal = await dealRes.json();

    return Response.json({
      ok: true,
      contactId,
      dealId: deal.id || null,
      dealCreated: dealRes.ok,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}