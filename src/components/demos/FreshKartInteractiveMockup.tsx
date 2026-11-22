import {
  CheckCircle2,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShoppingBag,
  Store,
} from 'lucide-react';
import { useState } from 'react';

type FreshKartRole = 'customer' | 'seller';
type GroceryCategory = 'All' | 'Produce' | 'Dairy';
type OrderStatus = 'Pending' | 'Packing' | 'Out for Delivery';

interface GroceryItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: Exclude<GroceryCategory, 'All'>;
  inStock: boolean;
}

interface SimulatedOrder {
  id: string;
  customer: string;
  itemsSummary: string;
  total: number;
  status: OrderStatus;
}

const INITIAL_CATALOG: GroceryItem[] = [
  { id: 'tomatoes', name: 'Fresh Tomatoes', unit: '1 kg', price: 45, category: 'Produce', inStock: true },
  { id: 'apples', name: 'Shimla Apples', unit: '1 kg', price: 140, category: 'Produce', inStock: true },
  { id: 'milk', name: 'Full Cream Milk', unit: '1 L', price: 64, category: 'Dairy', inStock: true },
  { id: 'paneer', name: 'Fresh Paneer', unit: '200 g', price: 90, category: 'Dairy', inStock: true },
];

const INITIAL_ORDERS: SimulatedOrder[] = [
  {
    id: 'FK-104',
    customer: 'Aarav M.',
    itemsSummary: 'Fresh Tomatoes (1 kg), Full Cream Milk (2 L)',
    total: 173,
    status: 'Packing',
  },
];

interface FreshKartInteractiveMockupProps {
  compact?: boolean;
}

export function FreshKartInteractiveMockup({ compact = false }: FreshKartInteractiveMockupProps) {
  const [role, setRole] = useState<FreshKartRole>('customer');
  const [category, setCategory] = useState<GroceryCategory>('All');
  const [catalog, setCatalog] = useState<GroceryItem[]>(INITIAL_CATALOG);
  const [cart, setCart] = useState<Record<string, number>>({ tomatoes: 1, milk: 1 });
  const [orders, setOrders] = useState<SimulatedOrder[]>(INITIAL_ORDERS);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  const adjustCart = (id: string, delta: number) => {
    setCart((prev) => {
      const nextQty = Math.max(0, (prev[id] ?? 0) + delta);
      const copy = { ...prev };
      if (nextQty === 0) {
        delete copy[id];
      } else {
        copy[id] = nextQty;
      }
      return copy;
    });
  };

  const cartEntries = catalog
    .map((item) => ({ item, qty: cart[item.id] ?? 0 }))
    .filter((entry) => entry.qty > 0 && entry.item.inStock);

  const cartCount = cartEntries.reduce((sum, entry) => sum + entry.qty, 0);
  const cartTotal = cartEntries.reduce(
    (sum, entry) => sum + entry.item.price * entry.qty,
    0
  );

  const placeSimulatedOrder = () => {
    if (cartEntries.length === 0) return;
    const summary = cartEntries
      .map((entry) => `${entry.item.name} ×${entry.qty}`)
      .join(', ');
    const created: SimulatedOrder = {
      id: `FK-${105 + orders.length}`,
      customer: 'Demo Customer',
      itemsSummary: summary,
      total: cartTotal,
      status: 'Pending',
    };
    setOrders((prev) => [created, ...prev]);
    setCart({});
    setOrderNotice(
      `Order ${created.id} placed. Switch to Seller View to process it live.`
    );
    window.setTimeout(() => setOrderNotice(null), 4000);
  };

  const toggleStock = (id: string) => {
    setCatalog((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  const cycleOrderStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;
        const nextStatus: OrderStatus =
          order.status === 'Pending'
            ? 'Packing'
            : order.status === 'Packing'
            ? 'Out for Delivery'
            : 'Pending';
        return { ...order, status: nextStatus };
      })
    );
  };

  const handleReset = () => {
    setRole('customer');
    setCategory('All');
    setCatalog(INITIAL_CATALOG);
    setCart({ tomatoes: 1, milk: 1 });
    setOrders(INITIAL_ORDERS);
    setOrderNotice(null);
  };

  const filteredCatalog =
    category === 'All'
      ? catalog
      : catalog.filter((item) => item.category === category);

  return (
    <div className="rounded-xl border border-[#DDE2E5]/12 bg-[#07090B] p-3.5 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DDE2E5]/10 pb-3">
        <div className="inline-flex rounded-lg border border-[#DDE2E5]/12 bg-[#111516] p-0.5">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors ${
              role === 'customer'
                ? 'bg-[#A8FF2A] text-[#07090B] font-semibold'
                : 'text-[#DDE2E5]/70 hover:text-white'
            }`}
          >
            <ShoppingBag className="h-3 w-3" />
            <span>Customer Flow</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('seller')}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors ${
              role === 'seller'
                ? 'bg-[#A8FF2A] text-[#07090B] font-semibold'
                : 'text-[#DDE2E5]/70 hover:text-white'
            }`}
          >
            <Store className="h-3 w-3" />
            <span>Seller Flow</span>
            <span className="font-mono text-[10px] tabular-nums opacity-80">
              ({orders.length})
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-amber-300">Concept Simulation</span>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset FreshKart simulation"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE2E5]/15 bg-[#111516] text-[#DDE2E5]/70 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {role === 'customer' ? (
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {(['All', 'Produce', 'Dairy'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    category === cat
                      ? 'bg-white/12 text-white'
                      : 'text-[#DDE2E5]/55 hover:text-[#DDE2E5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] tabular-nums text-[#DDE2E5]/70">
              Cart: {cartCount}
            </span>
          </div>

          <div
            className={`grid grid-cols-1 gap-2 sm:grid-cols-2 ${
              compact ? 'max-h-[160px] overflow-y-auto pr-0.5' : ''
            }`}
          >
            {filteredCatalog.map((item) => {
              const qty = cart[item.id] ?? 0;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-[#DDE2E5]/10 bg-[#111516] px-3 py-2.5"
                >
                  <div className="min-w-0 pr-2">
                    <p className="truncate text-xs font-medium text-white">
                      {item.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] tabular-nums text-[#DDE2E5]/70">
                      ₹{item.price} · {item.unit}
                    </p>
                  </div>

                  {item.inStock ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => adjustCart(item.id, -1)}
                        disabled={qty === 0}
                        aria-label={`Remove one ${item.name}`}
                        className="flex h-6 w-6 items-center justify-center rounded border border-[#DDE2E5]/20 text-[#DDE2E5] hover:border-[#A8FF2A] disabled:opacity-35"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center font-mono text-xs tabular-nums text-white">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjustCart(item.id, 1)}
                        aria-label={`Add one ${item.name}`}
                        className="flex h-6 w-6 items-center justify-center rounded border border-[#A8FF2A]/55 bg-[#A8FF2A]/15 text-[#A8FF2A] hover:bg-[#A8FF2A] hover:text-[#07090B]"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] font-medium text-[#DDE2E5]/50">
                      Out of stock
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {orderNotice && (
            <div className="flex items-center gap-2 text-[11px] font-medium text-[#A8FF2A]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>{orderNotice}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DDE2E5]/10 bg-[#111516] px-3.5 py-2.5">
            <div>
              <p className="text-[11px] text-[#DDE2E5]/55">Order Subtotal</p>
              <p className="font-mono text-sm font-semibold tabular-nums text-white">
                ₹{cartTotal}
              </p>
            </div>
            <button
              type="button"
              onClick={placeSimulatedOrder}
              disabled={cartTotal === 0}
              className="rounded-lg bg-[#A8FF2A] px-3.5 py-1.5 text-xs font-semibold text-[#07090B] whitespace-nowrap transition-colors hover:bg-[#99f21a] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <div>
            <p className="text-[11px] font-medium text-[#DDE2E5]/70">
              Incoming Customer Orders (Click status to advance)
            </p>
            <div
              className={`mt-2 space-y-2 ${
                compact ? 'max-h-[115px] overflow-y-auto pr-0.5' : ''
              }`}
            >
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-[#DDE2E5]/10 bg-[#111516] px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold text-white">
                      {order.id} · ₹{order.total}
                    </p>
                    <p className="truncate text-[11px] text-[#DDE2E5]/70">
                      {order.itemsSummary}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => cycleOrderStatus(order.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-[#A8FF2A]/45 bg-[#A8FF2A]/10 px-2.5 py-1 text-[11px] font-medium text-[#A8FF2A] whitespace-nowrap shrink-0 hover:bg-[#A8FF2A]/20"
                  >
                    <Package className="h-3 w-3" />
                    <span>{order.status}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#DDE2E5]/10 pt-2.5">
            <p className="text-[11px] font-medium text-[#DDE2E5]/70">
              Inventory Sync (Updates Customer View)
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {catalog.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleStock(item.id)}
                  className="flex items-center justify-between rounded-lg border border-[#DDE2E5]/10 bg-[#111516] px-2.5 py-1.5 text-left text-[11px] hover:border-[#DDE2E5]/25"
                >
                  <span className="truncate text-white">{item.name}</span>
                  <span
                    className={`ml-2 shrink-0 font-mono ${
                      item.inStock ? 'text-[#A8FF2A]' : 'text-[#DDE2E5]/50'
                    }`}
                  >
                    {item.inStock ? 'In Stock' : 'Paused'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
