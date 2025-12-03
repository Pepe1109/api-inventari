// Almacenament en memòria (per a aprendre el flux)
let PRODUCTS = [];
let _id = 1;

export async function list(req, res, next) {
  try {
    const { q, active } = req.query;
    const minPrice = req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;
    let data = [...PRODUCTS];

    if (q) {
      const needle = String(q).toLowerCase();
      data = data.filter(p => p.name.toLowerCase().includes(needle) || (p.sku ?? '').toLowerCase().includes(needle));
    }
    if (typeof active === 'boolean') data = data.filter(p => p.active === active);
    if (Number.isFinite(minPrice)) data = data.filter(p => p.price >= minPrice);
    if (Number.isFinite(maxPrice)) data = data.filter(p => p.price <= maxPrice);

    res.json(data);
  } catch (err) { next(err); }
}

export async function getById(req, res, next) {
  try {
    const product = PRODUCTS.find(p => String(p.id) === String(req.params.id));
    if (!product) return res.status(404).json({ error: 'No trobat' });
    res.json(product);
  } catch (err) { next(err); }
}

export async function create(req, res, next) {
  try {
    const { name, sku, price, stock, active = true } = req.body;
    if (sku && PRODUCTS.some(p => p.sku === sku)) return res.status(409).json({ error: 'SKU duplicat' });

    const now = new Date().toISOString();
    const created = { id: String(_id++), name, sku, price: Number(price), stock: Number(stock), active: Boolean(active), createdAt: now, updatedAt: now };
    PRODUCTS.push(created);
    res.status(201).json(created);
  } catch (err) { next(err); }
}

export async function update(req, res, next) {
  try {
    const idx = PRODUCTS.findIndex(p => String(p.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'No trobat' });
    const prev = PRODUCTS[idx];
    const { name = prev.name, sku = prev.sku, price = prev.price, stock = prev.stock, active = prev.active } = req.body ?? {};

    if (sku && sku !== prev.sku && PRODUCTS.some(p => p.sku === sku)) return res.status(409).json({ error: 'SKU duplicat' });

    const updated = { ...prev, name, sku, price: Number(price), stock: Number(stock), active: Boolean(active), updatedAt: new Date().toISOString() };
    PRODUCTS[idx] = updated;
    res.json(updated);
  } catch (err) { next(err); }
}

export async function adjustStock(req, res, next) {
  try {
    const idx = PRODUCTS.findIndex(p => String(p.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'No trobat' });
    const { delta } = req.body;
    const prev = PRODUCTS[idx];
    const newStock = Math.max(0, Number(prev.stock) + Number(delta));
    const updated = { ...prev, stock: newStock, updatedAt: new Date().toISOString() };
    PRODUCTS[idx] = updated;
    res.json(updated);
  } catch (err) { next(err); }
}

export async function remove(req, res, next) {
  try {
    const idx = PRODUCTS.findIndex(p => String(p.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'No trobat' });
    PRODUCTS.splice(idx, 1);
    res.status(204).send();
  } catch (err) { next(err); }
}
