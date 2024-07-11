import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProductsApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";
// import { useCart } from "../../context/cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [circle, setCircle] = useState([]);
  //   const [cart, setCart] = useCart();

  //   const getAllCategory = async () => {
  //     try {
  //       const { data } = await getAllCategoryApi();
  //       if (data?.success) {
  //         setCategories(data?.category);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Something went wrong in getting category!");
  //     }
  //   };

  //   useEffect(() => {
  //     getAllCategory();
  //   }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await getAllProductsApi();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!checked.length || !circle.length) getAllProducts();
  }, [checked.length, circle.length]);

  useEffect(() => {
    console.log(checked.length);
    console.log(circle.length);
    if (checked.length === 0 && circle.length === 0) {
      getAllProducts();
    }
    if (checked.length > 0 || circle.length > 0) {
      filteringProduct();
    }
  }, [checked, circle]);

  // Function to truncate text
  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const checkboxContainerStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "10px", // Add some space between checkboxes
  };

  const filteringProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/product/product-filters",
        {
          checked,
          circle,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wave-section">
      <AnimatedWave />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <h6>Filter By Category</h6>
            <div style={checkboxContainerStyle}>
              {/* {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))} */}
            </div>
            {/* Placeholder for Filter By Price */}
            {/* <h6 className="mt-4">Filter By Price</h6> */}
            {/* Placeholder checkboxes or range slider for price filtering */}

            {/* <div className="d-flex dlex-column">
            <Radio.Group onChange={(e) => setCircle(e.target.value)}>
              {Prices?.map((p) => (
                <Radio key={p._id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>
          </div> */}
            <div className="d-flex dlex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">User Products</h1>
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-4 mb-3" key={p._id}>
                  <div className="card h-100">
                    <img
                      src={p.productImageUrl}
                      className="card-img-top"
                      alt={p.productName}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.productName}</h5>
                      <h2 className="card-text">Rs. {p.productPrice}</h2>
                      <p className="card-text">
                        {truncateText(p.productDescription, 100)}
                      </p>
                      <p className="card-text mt-auto">{p.category?.name}</p>
                      <Link
                        to={`/singleProduct/${p._id}`}
                        className="text-dark text-decoration-none"
                      >
                        View more
                      </Link>
                      {/* <button
                      className="btn btn-primary"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      Add to cart
                    </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
