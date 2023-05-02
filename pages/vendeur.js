import {
    Grid,
  } from "@mui/material"; 
  import Vendeur from "../src/components/dashboard/Vendeur";
  
   export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('http://127.0.0.1:8000/api/vendeurs')
    const vendeurs = await res.json()
 
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        vendeurs: vendeurs, 
      },
    }
  }
   
  const vendeur = ({ vendeurs }) => { 
    return (
      <Grid container spacing={0}> 
        <Grid item xs={12} lg={12}>
          <Vendeur vendeurs={vendeurs}   />
        </Grid>
      </Grid>
    );
  };
  
  export default vendeur;
  