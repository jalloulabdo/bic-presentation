import {
  Grid,
} from "@mui/material"; 
import Category from "../src/components/dashboard/Category";

 export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://127.0.0.1:8000/api/get_categorys')
  const categorys = await res.json()
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      categorys,
    },
  }
}
 
const Buttons = ({ categorys }) => { 
  return (
    <Grid container spacing={0}> 
      <Grid item xs={12} lg={12}>
        <Category categorys={categorys} />
      </Grid>
    </Grid>
  );
};

export default Buttons;
