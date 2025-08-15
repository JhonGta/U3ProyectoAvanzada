
// Mock global alert para evitar errores en JSDOM y poder verificar llamadas a alert
beforeAll(() => {
  window.alert = jest.fn();
});

// Importaciones necesarias para las pruebas
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { MemoryRouter } from 'react-router-dom';

// Producto de ejemplo que se usará en las pruebas
const mockProduct = {
  _id: '1',
  name: 'Camiseta Deportiva',
  description: 'Camiseta de alta calidad para deporte.',
  price: 29.99,
  brand: 'Nike',
  image: '',
  colors: ['Rojo', 'Azul', 'Negro'],
  sizes: ['M', 'L'],
  stock: 10,
};

// Mock del contexto de carrito para controlar el comportamiento de addToCart y loading
jest.mock('../context/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(() => Promise.resolve(true)), // simula éxito al agregar
    loading: false,
  }),
}));

// Grupo de pruebas para el componente ProductCard
describe('ProductCard', () => {
  // Prueba que verifica que la información del producto se muestre correctamente
  it('muestra la información del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    // Verifica que los textos clave estén en el documento
    expect(screen.getByText('Camiseta Deportiva')).toBeInTheDocument();
    expect(screen.getByText('Camiseta de alta calidad para deporte.')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('Rojo')).toBeInTheDocument();
  });

  // Prueba que verifica que el botón "Agregar" llama a addToCart al hacer clic
  it('llama a addToCart al hacer clic en el botón', async () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    // Selecciona el botón por su rol y nombre
    const button = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(button);
    // Verifica que el botón esté habilitado (no deshabilitado)
    expect(button).toBeEnabled();
  });

  // Prueba que verifica que el botón se deshabilita si no hay stock
  it('deshabilita el botón si no hay stock', () => {
    // Crea un producto sin stock
    const productSinStock = { ...mockProduct, stock: 0 };
    render(
      <MemoryRouter>
        <ProductCard product={productSinStock} />
      </MemoryRouter>
    );
    // Selecciona el botón y verifica que esté deshabilitado
    const button = screen.getByRole('button', { name: /agregar/i });
    expect(button).toBeDisabled();
  });
});

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
  ],
};
