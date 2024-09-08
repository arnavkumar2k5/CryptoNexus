import React, { useState, useEffect } from "react";
import Conf from "../Conf/Conf";
import{Container, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, TextField, Paper} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import {Pagination} from '@mui/material'
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x) {
  if (x === undefined || x === null) {
      return '';
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 
function CoinTable() {
  const currency = useSelector((state) => state.cryptoAuth.currency)
  const symbol = useSelector((state) => state.cryptoAuth.symbol)
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&apikey=${Conf.apiKey}`
    )
      .then((res) => res.json())
      .then((res) => setCoins(res))
      .catch((err) => console.error(err));
      console.log(coins)
  }, [currency]);

  const handleSearch = () => {
    const searchTerm = search.trim().toLowerCase();
    return coins.filter((coin) => 
      coin.name.toLowerCase().includes(searchTerm) || coin.symbol.toLowerCase().includes(searchTerm))
  }

  return (
    <div className="md:w-4/5 m-auto mt-10">
      <Container className="text-center">
        <TextField
        label= "Search for a Crypto Currency.."
        type="text"
        className="w-full bg-[#262424] rounded-l rounded-r"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#B0B0B0', // Default border color
            },
            '&:hover fieldset': {
              borderColor: '#FFD700', // Border color on hover (gold)
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFD700', // Border color when focused
            },
          },
          '& .MuiInputBase-input': {
            color: '#000', // Default text color
            '&:hover': {
              color: '#FFD700', // Text color on hover
            },
            '&.Mui-focused': {
              color: '#FFD700', // Text color when focused
            },
          },
          '& .MuiInputLabel-root': {
            color: '#B0B0B0', // Default label color
            '&:hover': {
              color: '#FFD700', // Label color on hover
            },
            '&.Mui-focused': {
              color: '#FFD700', // Label color when focused
            },
          },
        }}
        onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper} className="border-2 border-[#FFD700] mt-5">
          {}
          <Table>
            <TableHead>
              <TableRow className="bg-[#FFD700]">
                {["Rank", "Coin", "Symbol", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="bg-[#0d1a33]" style={{cursor: "pointer"}}>
              {handleSearch()
              .slice((page-1) * 10, (page - 1) * 10 + 10)
              .map((row) => { 
                const profit = row.price_change_percentage_24h > 0;
                return(
                <TableRow key={row.name} onClick={() => navigate(`/coin/${row?.id}`)}>
                <TableCell style={{color: "wheat"}}>
                  {row.market_cap_rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                  <img src={row?.image} alt={row.name} className="w-10"/>
                  <span className="ml-2">{row.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="uppercase">{row.symbol}</span>
                </TableCell>
                <TableCell style={{color: "wheat"}}>
                  {symbol}
                  {numberWithCommas(row.current_price.toFixed(2))}
                </TableCell>
                <TableCell
                style={{
                  color: profit ? "rgb(14, 203, 129)" : "red",
                  fontWeight: 500,
                }}
                >
                  {profit && "+"}
                  {row.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell style={{color: "wheat"}}>
                  {symbol}
                  {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          className="w-full md:w-full md:p-5"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450)
          }}
          sx={{
            "& .MuiPaginationItem-root": {
      color: "wheat", // styling the pagination items with wheat color
    }
          }}
        />
      </Container>
    </div>
  );
}

export default CoinTable;
