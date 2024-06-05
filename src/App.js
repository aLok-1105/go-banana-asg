// src/App.js
import React, { useEffect, useState } from 'react';
import { Container, TextField, Grid, Typography, CircularProgress, Pagination } from '@mui/material';
import { fetchShows, searchShows } from './ApiService';
import ShowCard from '../src/components/ShowCard';

function App() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const showsPerPage = 20;

  useEffect(() => {
    const getShows = async () => {
      setLoading(true);
      const data = await fetchShows();
      setShows(data);
      setFilteredShows(data);
      setLoading(false);
    };
    getShows();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const search = async () => {
        const results = await searchShows(searchTerm);
        setFilteredShows(results);
      };
      search();
    } else {
      setFilteredShows(shows);
    }
  }, [searchTerm, shows]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedShows = filteredShows.slice((page - 1) * showsPerPage, page * showsPerPage);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        <b>GoBananas TV Shows</b>
      </Typography>
      <TextField
        label="Search Shows"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={e => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {displayedShows.map(show => (
              <Grid item key={show.id} xs={12} sm={6} md={4} lg={3}>
                <ShowCard show={show} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(filteredShows.length / showsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 2 }}
          />
        </>
      )}
    </Container>
  );
}

export default App;
