export function calcSquareFootage(settings, data) {
  if (data.garage_size === "custom") {
    const l = Number(data.custom_length) || 0;
    const w = Number(data.custom_width) || 0;
    return Math.round(l * w);
  }
  const d = settings.size_defaults || {};
  return d[data.garage_size] || d.not_sure || 400;
}

export function calcEstimate(settings, data) {
  const sqft = data.square_footage || calcSquareFootage(settings, data);
  const system = (settings.systems || []).find((s) => s.key === data.desired_system) || (settings.systems || [])[0];
  const base = sqft * (system?.price_per_sqft || 8);

  const selected = data.floor_condition || [];
  const adjPercent = (settings.condition_adjustments || [])
    .filter((c) => selected.includes(c.key))
    .reduce((sum, c) => sum + (Number(c.percent) || 0), 0);

  let mid = base * (1 + adjPercent / 100);
  mid = Math.max(mid, Number(settings.minimum_project_price) || 0);

  const low = Math.round((mid * (1 - (Number(settings.range_low_percent) || 0) / 100)) / 50) * 50;
  const high = Math.round((mid * (1 + (Number(settings.range_high_percent) || 0) / 100)) / 50) * 50;

  const packages = (settings.packages || []).map((p) => ({
    tier: p.tier,
    name: p.name,
    description: p.description,
    low: Math.round((low * (p.multiplier || 1)) / 50) * 50,
    high: Math.round((high * (p.multiplier || 1)) / 50) * 50
  }));

  return { sqft, mid: Math.round(mid), low, high, packages, system };
}

export const money = (n) => `$${Math.round(n || 0).toLocaleString()}`;