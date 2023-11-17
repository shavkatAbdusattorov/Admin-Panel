import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Input,
  Box,
  Fab,
  FormControl,
  InputLabel,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

import AddIcon from "@mui/icons-material/Add";
import { singleFile } from "../../utils/files";
const Products = () => {
  const api = "http://localhost:3000/api/products";
  const brandsAPI = "http://localhost:3000/api/brands";
  const categories = "http://localhost:3000/api/categories";
  const subcategories = "http://localhost:3000/api/subCategories";
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  useEffect(() => {
    getProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      categoryId: "",
      subCategoryId: "",
      brandId: "",
      price: "",
      discount: "",
      hasDiscount: false,
      isNew: false,
      description: "",
      properties: [],
      media: [],
      id: "",
      quantity: "",
    },
    onSubmit: (values) => {
      addProducts(values);
      setOpen(false);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(api);
      setProducts(response.data);
    } catch (error) {
      console.log(
        "There was a problem with the axios operation: " + error.message
      );
    }
  };
  function getToken() {
    return localStorage.getItem("access_token");
  }
  const token = getToken();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setImgFile(file);
  };

  const addProducts = async (product) => {
    try {
      const formData = new FormData();
      formData.append("file", imgFile);
      const fileData = await singleFile(formData);
      const media = [
        {
          type: "image/jpeg",
          src: fileData.img,
        },
      ];
      const { data } = await axios.post(
        api,
        { ...product, media },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts([...products, data]);
      getProducts();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  async function getBrands() {
    try {
      const { data } = await axios.get(brandsAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBrands(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBrands();
  }, []);

  const [Brands, setBrands] = useState([]);
  const [Categories, setcategories] = useState([]);

  async function getcategories() {
    try {
      const { data } = await axios.get(categories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setcategories(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getcategories();
  }, []);

  const [subCategories, setsubcategories] = useState([]);
  async function getsubcategories() {
    try {
      const { data } = await axios.get(subcategories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setsubcategories(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getsubcategories();
  }, []);

  async function deleteproduct(id) {
    try {
      console.log("Deleting product with id: ", id);
      const { data } = await axios.delete(`${api}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(id);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="mt-[20px]">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          style={{ color: "#3f51b5", textAlign: "center" }}
        >
          🎁 Discover a Treasure Trove of Products 🎁
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          Welcome to our products page, a cornucopia of items waiting to be
          discovered. From the latest trends to timeless classics, there's
          something for everyone. Start your shopping adventure here!
        </Typography>
      </div>

      <div className="mt-[20px]">
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  label="Category"
                  name="categoryId"
                >
                  {Categories.map((e, index) => (
                    <MenuItem key={index} value={index}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="sub-category-label">Sub-Category</InputLabel>
                <Select
                  labelId="sub-category-label"
                  id="sub-category-select"
                  value={formik.values.subCategoryId}
                  onChange={formik.handleChange}
                  label="Sub-Category"
                  name="subCategoryId"
                >
                  {subCategories.map((e, index) => (
                    <MenuItem key={index} value={index}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  labelId="brand-label"
                  id="brand-select"
                  value={formik.values.brandId}
                  onChange={formik.handleChange}
                  label="Brand"
                  name="brandId"
                >
                  {Brands.map((brand, index) => (
                    <MenuItem key={index} value={index}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input type="file" onChange={handleFileChange} multiple />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="discount"
                label="Discount"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.discount}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.hasDiscount}
                    onChange={formik.handleChange}
                    name="hasDiscount"
                  />
                }
                label="Has Discount"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isNew}
                    onChange={formik.handleChange}
                    name="isNew"
                  />
                }
                label="Is New"
              />
            </Grid>
            <Grid item xs={12}>
              <ReactQuill
                theme="snow"
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue("description", value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={formik.handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>

      <div className="mt-[20px]">
        <Grid container spacing={3}>
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card style={{ height: "390px", width: "350px" }}>
                  <CardMedia
                    component="img"
                    style={{ height: "150px", objectFit: "contain" }}
                    image={`http://localhost:3000/${product.media[0]?.src}`}
                    alt={product.name}
                  />
                  <Box style={{ maxHeight: "230px", overflow: "auto" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {product.price}
                      </Typography>
                      <div className="ml-[-15px]">
                        <Typography variant="body2" color="text.secondary">
                          <ReactQuill
                            value={product.description}
                            readOnly={true}
                            theme={"bubble"}
                          />
                        </Typography>
                      </div>
                    </CardContent>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  rounded text-center ml-[40px]"
                      onClick={() => {
                        deleteproduct(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Products;
