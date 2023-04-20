import {
  Grid,
} from "@mui/material"; 
import Product from "../src/components/dashboard/Product";

 export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://127.0.0.1:8000/api/products')
  const products = await res.json()
  const rescategorys = await fetch('http://127.0.0.1:8000/api/categories')
  const categorys = await rescategorys.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products: products,
      categorys : categorys
    },
  }
}
 
const Buttons = ({ products,categorys }) => { 
  return (
    <Grid container spacing={0}> 
      <Grid item xs={12} lg={12}>
        <Product products={products} categorys={categorys} />
      </Grid>
    </Grid>
  );
};

export default Buttons;
