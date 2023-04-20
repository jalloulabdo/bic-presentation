import {
  Grid,
} from "@mui/material"; 
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";

 export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://127.0.0.1:8000/api/users')
  const users = await res.json()
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  }
}
 
const Buttons = ({ users }) => { 
  return (
    <Grid container spacing={0}> 
      <Grid item xs={12} lg={12}>
        <ProductPerfomance users={users} />
      </Grid>
    </Grid>
  );
};

export default Buttons;
