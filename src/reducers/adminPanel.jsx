import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosRequest } from "../utilities/Token";
const ProductsApi = "http://localhost:3000/api/products";
// const CartApi = "http://localhost:3000/api/orders";
const BrandApi = "http://localhost:3000/api/brands";
const CategoriesApi = "http://localhost:3000/api/categories";
const SubCatApi = "http://localhost:3000/api/subcategories";

//  Brands
export const GetBrands = createAsyncThunk("Brands/GetBrands", async () => {
  try {
    const { data } = await axiosRequest.get(BrandApi);
    return data;
  } catch (error) {
    console.error(error);
  }
});
export const DelBrand = createAsyncThunk(
  "Brand/DelBrand",
  async (id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.delete(`${BrandApi}/${id}`);
      dispatch(GetBrands());
    } catch (error) {
      console.error(error);
    }
  }
);
export const EditBrand = createAsyncThunk(
  "Brands/EditBrand",
  async (user, { dispatch }) => {
    try {
      const { data } = await axiosRequest.put(`${BrandApi}/${user.id}`, user);
      dispatch(GetBrands());
    } catch (error) {
      console.error(error);
    }
  }
);

export const AddBrand = createAsyncThunk(
  "Brands/AddBrand",
  async (e, { dispatch }) => {
    console.log(1);
    // let obj = {
    //   name: name,
    //   img: img,
    // };
    try {
      const { data } = await axiosRequest.post(BrandApi, {
        name: e.name,
        img: e.img,
      });
      console.log(data);

      dispatch(GetBrands());
    } catch (error) {
      console.error(error);
    }
  }
);
// ^ Brands
// Products
export const GetProducts = createAsyncThunk(
  "Products/GetProducts",
  async () => {
    try {
      const { data } = await axiosRequest.get(ProductsApi);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const DelProducts = createAsyncThunk(
  "Products/DelProducts",
  async (id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.delete(`${ProductsApi}/${id}`);
      dispatch(GetProducts());
    } catch (error) {
      console.error(error);
    }
  }
);
export const EditProducts = createAsyncThunk(
  "Products/EditProducts",
  async (user, { dispatch }) => {
    try {
      const { data } = await axiosRequest.put(
        `${ProductsApi}/${user.id}`,
        user
      );
      dispatch(GetProducts());
    } catch (error) {
      console.error(error);
    }
  }
);
// /Products ^
// / Categories
export const GetCategories = createAsyncThunk(
  "Products/GetCategoties",
  async () => {
    try {
      const { data } = await axiosRequest.get(CategoriesApi);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const DelCategories = createAsyncThunk(
  "Products/DelProducts",
  async (id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.delete(`${CategoriesApi}/${id}`);
      dispatch(GetCategories());
    } catch (error) {
      console.error(error);
    }
  }
);
export const EditCategories = createAsyncThunk(
  "Products/EditProducts",
  async (e, { dispatch }) => {
    try {
      const { data } = await axiosRequest.put(`${CategoriesApi}/${e.id}`, e);
      dispatch(GetCategories());
    } catch (error) {
      console.error(error);
    }
  }
);
export const AddCategories = createAsyncThunk(
  "Categories/AddCategories",
  async (e, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(CategoriesApi, {
        name: e.name,
        img: e.img,
      });
      dispatch(GetCategories());
    } catch (error) {
      console.error(error);
    }
  }
);
// /Categories ^
// / SUBC
export const GetSubCat = createAsyncThunk("SUB/GetSubCat", async () => {
  try {
    const { data } = await axiosRequest.get(SubCatApi);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
});
export const DelSubCat = createAsyncThunk(
  "SUB/DelSubCat",
  async (id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.delete(`${SubCatApi}/${id}`);
      dispatch(GetSubCat);
    } catch (error) {
      console.error(error);
    }
  }
);
export const EditSubCat = createAsyncThunk(
  "SubCat/EditSubCat",
  async (e, { dispatch }) => {
    try {
      const { data } = await axiosRequest.put(`${SubCatApi}/${e.id}`, e);
      dispatch(GetSubCat());
    } catch (error) {
      console.error(error);
    }
  }
);

export const onlineShop = createSlice({
  name: "Brands",
  initialState: {
    Brands: [],
    isloading: false,
    Products: [],
    Categories: [],
    SubCat: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    // Brands
    builder.addCase(GetBrands.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(GetBrands.fulfilled, (state, action) => {
      state.isloading = false;
      state.Brands = action.payload;
    });
    builder.addCase(GetBrands.rejected, (state, action) => {
      state.isloading = false;
    });
    //   Brands ^
    // Products
    builder.addCase(GetProducts.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(GetProducts.fulfilled, (state, action) => {
      state.isloading = false;
      //   console.log(action.payload);
      state.Products = action.payload;
    });
    builder.addCase(GetProducts.rejected, (state, action) => {
      state.isloading = false;
    });
    //   Products^
    // / Categories
    builder.addCase(GetCategories.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(GetCategories.fulfilled, (state, action) => {
      state.isloading = false;
      //   console.log(action.payload);
      state.Categories = action.payload;
    });
    // Categories
    // / SubCat
    builder.addCase(GetSubCat.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(GetSubCat.fulfilled, (state, action) => {
      console.log(action);
      state.SubCat = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  deleteTodo,
  completedTodo,
  editTodo,
  ProductByIdFunc,
  decrement,
} = onlineShop.actions;
export default onlineShop.reducer;
