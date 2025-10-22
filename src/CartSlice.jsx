import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ name, image, cost, quantity }]
  },
  reducers: {
    // Agrega un producto al carrito (si ya existe por nombre, incrementa su cantidad)
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      // Buscar si ya existe ese producto por nombre
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Guardamos el costo como número para facilitar los totales más adelante
        const numericCost = typeof cost === 'string'
          ? parseFloat(cost.replace(/[^0-9.]/g, ''))
          : cost;

        state.items.push({
          name,
          image,
          cost: numericCost,   // ← número (ej: 15)
          quantity: 1,
        });
      }
    },

    // Elimina un producto del carrito por nombre
    removeItem: (state, action) => {
      // payload = nombre del producto a eliminar
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // Actualiza la cantidad de un producto { name, quantity }
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (!itemToUpdate) return;

      if (quantity <= 0) {
        // Si llega a 0, lo quitamos del carrito (útil para el botón "−")
        state.items = state.items.filter(item => item.name !== name);
      } else {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =CartSlice.actions;
export default CartSlice.reducer;
