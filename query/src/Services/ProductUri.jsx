import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './Api';

export const useProductApi = () => {
  const queryClient = useQueryClient();

  // Fetch products
  const fetchProducts = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });

  // Add product
  const addProduct = useMutation({
    mutationFn: async (newProduct) => {
      const res = await api.post('/products', newProduct);
      return res.data;
    },
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries(['products']);
      const previousProducts = queryClient.getQueryData(['products']);
      queryClient.setQueryData(['products'], old => [...old, { ...newProduct, id: Math.random().toString(36).substring(7) }]);
      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      queryClient.setQueryData(['products'], context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['products']);
    }
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: async (productId) => {
      const res = await api.delete(`/products/${productId}`);
      return res.data;
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries(['products']);
      const previousProducts = queryClient.getQueryData(['products']);
      queryClient.setQueryData(['products'], old => old.filter(product => product.id !== productId));
      return { previousProducts };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(['products'], context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['products']);
    }
  });

  return {
    fetchProducts,
    addProduct,
    deleteProduct
  };
};
